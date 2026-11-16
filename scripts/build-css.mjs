#!/usr/bin/env node
// @ts-check
/**
 * Writes the package's CSS files after `tsdown` built the JS:
 *   dist/vivid.css  the full Vivid stylesheet (tokens for both themes + the design's CSS), exactly
 *                   what <DesignProvider> injects, for apps that serve styles as a file
 *                   (strict CSP without a style nonce, CONSISTENCY item 119);
 *   dist/fonts.css  the self-hosted Plus Jakarta Sans import.
 * It imports the BUILT design (dist/index.mjs), so the file is generated from what ships, and it
 * fails (exit 1) when the build is missing, instead of publishing a package without its CSS.
 */
import { existsSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const entry = join(root, 'dist', 'index.mjs')
if (!existsSync(entry)) {
  process.stderr.write('build-css: dist/index.mjs is missing; run tsdown first.\n')
  process.exit(1)
}
/** @type {{ vividStylesheet: () => string, FONTS_CSS: string }} */
const built = await import(pathToFileURL(entry).href)
writeFileSync(join(root, 'dist', 'vivid.css'), built.vividStylesheet())
writeFileSync(join(root, 'dist', 'fonts.css'), built.FONTS_CSS)
process.stdout.write('build-css: wrote dist/vivid.css and dist/fonts.css\n')
