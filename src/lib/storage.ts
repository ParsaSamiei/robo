import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Docs/25_API_AND_SERVER_ARCHITECTURE.md §23: "MediaService -> StorageAdapter
// -> Local / S3-compatible / Object Storage" -- this interface is the layer
// that lets hosting change without rewriting gallery/media logic. Only a
// local filesystem adapter is implemented (§24 explicitly allows this for
// development); swap in an S3-compatible adapter behind the same interface
// for production if the host doesn't offer persistent local disk (§25).
export interface StorageAdapter {
  /** Writes a buffer under the given key, returns the key actually used. */
  write(key: string, data: Buffer): Promise<string>;
  delete(key: string): Promise<void>;
  /** Public URL a browser can load the stored object from. */
  urlFor(key: string): string;
}

// Docs/25 §24: local filesystem storage, rooted under public/uploads so
// Next's static file serving picks it up with no custom route needed
// (matches the earlier decision to keep uploads under public/).
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
}

export const storage: StorageAdapter = new LocalStorageAdapter();

// Docs/25 §26-27: never use the user-provided filename as the storage path;
// generate a safe unique key instead, namespaced by year like the doc's own
// example ("gallery/2026/uuid-image.webp").
export function generateStorageKey(namespace: string, extension: string) {
  const year = new Date().getFullYear();
  const safeExt = extension.replace(/[^a-z0-9]/gi, "").toLowerCase() || "bin";
  return `${namespace}/${year}/${randomUUID()}.${safeExt}`;
}
