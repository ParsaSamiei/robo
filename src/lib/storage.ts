import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// Docs/25_API_AND_SERVER_ARCHITECTURE.md §23: "MediaService -> StorageAdapter
// -> Local / S3-compatible / Object Storage" -- this interface is the layer
// that lets hosting change without rewriting gallery/media logic.
//
// Two adapters are implemented:
//  - LocalStorageAdapter: writes to public/uploads on disk. Only works when
//    the process has a persistent, writable filesystem (a VPS/Docker host).
//  - ArvanStorageAdapter: writes to ArvanCloud Object Storage (S3-compatible)
//    over the network. Required on Vercel (and any other serverless host),
//    since serverless functions get an ephemeral/read-only filesystem --
//    anything written to public/uploads at runtime disappears (or fails to
//    write at all) as soon as the invocation ends.
export interface StorageAdapter {
  /** Writes a buffer under the given key, returns the key actually used. */
  write(key: string, data: Buffer): Promise<string>;
  delete(key: string): Promise<void>;
  /** Public URL a browser can load the stored object from. */
  urlFor(key: string): string;
  /** Inverse of urlFor: recovers the storage key from a URL it produced. */
  keyFromUrl(url: string): string;
}

// Docs/25 §24: local filesystem storage, rooted under public/uploads so
// Next's static file serving picks it up with no custom route needed
// (matches the earlier decision to keep uploads under public/).
//
// Dev/VPS/Docker only -- do NOT use this on Vercel or any other serverless
// host. See ArvanStorageAdapter below.
class LocalStorageAdapter implements StorageAdapter {
  private root() {
    const configured = process.env.UPLOAD_DIRECTORY ?? "./public/uploads";
    return path.isAbsolute(configured) ? configured : path.join(process.cwd(), configured);
  }

  private resolve(key: string) {
    const root = this.root();
    const target = path.join(root, key);
    // §27: guard against path traversal even though keys are
    // server-generated (defense in depth, not just filename sanitization).
    if (!target.startsWith(path.normalize(root))) {
      throw new Error("Storage key escapes the uploads root.");
    }
    return target;
  }

  async write(key: string, data: Buffer) {
    const target = this.resolve(key);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, data);
    return key;
  }

  async delete(key: string) {
    await unlink(this.resolve(key)).catch(() => {
      // Already gone -- deleting a Media row whose file was manually
      // removed shouldn't be a hard failure.
    });
  }

  urlFor(key: string) {
    // public/uploads/<key> is served at /uploads/<key>.
    return `/uploads/${key}`;
  }

  keyFromUrl(url: string) {
    return url.replace(/^\/uploads\//, "");
  }
}

// ArvanCloud Object Storage is S3-compatible (docs.arvancloud.ir/en/
// developer-tools/sdk/object-storage). Same API shape as AWS S3 via
// @aws-sdk/client-s3, pointed at Arvan's endpoint instead of AWS's.
//
// Required env vars:
//   ARVAN_ENDPOINT     e.g. https://s3.ir-thr-at1.arvanstorage.ir
//                       (Simin region) or https://s3.ir-tbz-sh1.arvanstorage.ir
//                       (Shahriar region) -- pick whichever region your
//                       bucket was created in, this can't be changed later.
//   ARVAN_BUCKET        the bucket name.
//   ARVAN_ACCESS_KEY    from the Object Storage dashboard in the Arvan panel.
//   ARVAN_SECRET_KEY    from the same place.
// Optional:
//   ARVAN_PUBLIC_URL    a custom/CDN domain to serve objects from instead of
//                       the default virtual-hosted bucket URL (Arvan buckets
//                       are CDN-backed by default, but you may want a
//                       branded subdomain). No trailing slash.
class ArvanStorageAdapter implements StorageAdapter {
  private client: S3Client;
  private bucket: string;
  private endpoint: string;
  private publicBase: string;

  constructor() {
    const endpoint = requireEnv("ARVAN_ENDPOINT");
    const bucket = requireEnv("ARVAN_BUCKET");
    this.endpoint = endpoint;
    this.bucket = bucket;
    this.client = new S3Client({
      region: process.env.ARVAN_REGION || "default",
      endpoint,
      // Arvan (like most S3-compatible providers outside AWS) serves
      // buckets as https://<bucket>.<endpoint-host>/<key> -- virtual-hosted
      // style -- confirmed by Arvan's own signed-request examples, which
      // set Host: <bucket>.s3.<region>.arvanstorage.ir. So forcePathStyle
      // stays false (the SDK default).
      credentials: {
        accessKeyId: requireEnv("ARVAN_ACCESS_KEY"),
        secretAccessKey: requireEnv("ARVAN_SECRET_KEY"),
      },
    });
    this.publicBase =
      process.env.ARVAN_PUBLIC_URL?.replace(/\/$/, "") ||
      endpoint.replace(/^https?:\/\//, (m) => `${m}${bucket}.`);
  }

  async write(key: string, data: Buffer) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: data,
        // Media served to every site visitor (gallery images, member
        // photos, the hero .glb, etc) -- objects need to be publicly
        // readable without signed URLs.
        ACL: "public-read",
      })
    );
    return key;
  }

  async delete(key: string) {
    await this.client
      .send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }))
      .catch(() => {
        // Already gone -- deleting a Media row whose object was manually
        // removed shouldn't be a hard failure.
      });
  }

  urlFor(key: string) {
    return `${this.publicBase}/${key}`;
  }

  keyFromUrl(url: string) {
    return url.startsWith(this.publicBase) ? url.slice(this.publicBase.length + 1) : url;
  }
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

// Arvan is used whenever it's configured; otherwise fall back to local disk
// (dev, or a VPS/Docker deployment that intentionally keeps files local).
// On Vercel, ARVAN_* must be set -- there's no writable persistent disk to
// fall back to there.
function selectAdapter(): StorageAdapter {
  const hasArvanConfig =
    process.env.ARVAN_ENDPOINT &&
    process.env.ARVAN_BUCKET &&
    process.env.ARVAN_ACCESS_KEY &&
    process.env.ARVAN_SECRET_KEY;
  return hasArvanConfig ? new ArvanStorageAdapter() : new LocalStorageAdapter();
}

export const storage: StorageAdapter = selectAdapter();

// Docs/25 §26-27: never use the user-provided filename as the storage path;
// generate a safe unique key instead, namespaced by year like the doc's own
// example ("gallery/2026/uuid-image.webp").
export function generateStorageKey(namespace: string, extension: string) {
  const year = new Date().getFullYear();
  const safeExt = extension.replace(/[^a-z0-9]/gi, "").toLowerCase() || "bin";
  return `${namespace}/${year}/${randomUUID()}.${safeExt}`;
}
