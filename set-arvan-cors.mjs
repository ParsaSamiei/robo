// One-off script: sets the CORS policy on your ArvanCloud bucket so the
// browser can GET objects directly (needed for gallery images and the
// hero .glb served from NEXT_PUBLIC_HERO_MODEL_URL).
//
// Usage:
//   ARVAN_ENDPOINT=https://s3.ir-thr-at1.arvanstorage.ir \
//   ARVAN_BUCKET=your-bucket \
//   ARVAN_ACCESS_KEY=xxx \
//   ARVAN_SECRET_KEY=xxx \
//   SITE_ORIGIN=https://your-site-domain.com \
//   node set-arvan-cors.mjs
//
// Run this once (or again whenever you need to change allowed origins).
// Needs @aws-sdk/client-s3 -- already a dependency of the robo project,
// so run it with `node` from inside that project folder, or
// `npm install @aws-sdk/client-s3` in a scratch folder first.

import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";

const endpoint = requireEnv("ARVAN_ENDPOINT");
const bucket = requireEnv("ARVAN_BUCKET");
const siteOrigin = process.env.SITE_ORIGIN || "http://localhost:3000";

const s3 = new S3Client({
  region: "default",
  endpoint,
  credentials: {
    accessKeyId: requireEnv("ARVAN_ACCESS_KEY"),
    secretAccessKey: requireEnv("ARVAN_SECRET_KEY"),
  },
});

const command = new PutBucketCorsCommand({
  Bucket: bucket,
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedHeaders: ["*"],
        AllowedMethods: ["GET", "HEAD"],
        // Add every origin you actually serve the site from --
        // production domain, any preview domains, and localhost for dev.
        AllowedOrigins: [siteOrigin, "http://localhost:3000"],
        ExposeHeaders: [],
        MaxAgeSeconds: 3600,
      },
    ],
  },
});

try {
  await s3.send(command);
  console.log(`CORS configured on bucket "${bucket}" for origin "${siteOrigin}".`);
} catch (err) {
  console.error("Failed to set CORS:", err);
  process.exit(1);
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}
