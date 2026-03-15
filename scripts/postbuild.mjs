/**
 * Writes a minimal prerender-manifest.json if the Next.js build left it out.
 * This happens on Windows-mounted filesystems where `rmdir .next/export` fails
 * with EIO, causing the build to terminate before writing the manifest.
 */
import { existsSync, writeFileSync, readFileSync } from "fs";
import { randomBytes } from "crypto";

const manifestPath = ".next/prerender-manifest.json";

if (existsSync(manifestPath)) {
  process.exit(0);
}

// Read build-id for consistency
const buildId = existsSync(".next/BUILD_ID")
  ? readFileSync(".next/BUILD_ID", "utf8").trim()
  : "unknown";

const manifest = {
  version: 4,
  routes: {},
  dynamicRoutes: {},
  notFoundRoutes: [],
  preview: {
    previewModeId: randomBytes(16).toString("hex"),
    previewModeSigningKey: randomBytes(32).toString("hex"),
    previewModeEncryptionKey: randomBytes(32).toString("hex"),
  },
};

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("postbuild: wrote missing prerender-manifest.json (build ID:", buildId, ")");
