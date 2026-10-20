# RIZKY ATELIER — The Living Gallery

Created by Muhammad Rizky. A single, English-language digital showroom combining Walnut Bedroom, SIENNA 2026 and HOI AN 2026 with shared navigation, catalogue, material library, contact workflow and native WebGL viewer. No iframes or external website switching are used for the primary experience. The three original projects remain unchanged.

GitHub Pages: https://rizky-make-it.github.io/rizky-atelier/

Source repository: https://github.com/rizky-make-it/rizky-atelier

## Run locally

Node.js 24 or newer. No dependency install, backend, API keys or paid services.

```
npm test
npm run dev
```

Open http://127.0.0.1:4176/. Use HTTP, not file://. Deployable files are in dist/. Hash routes preserve collection/product links and browser back/forward without server rewrites; GitHub Pages repository subpaths work out of the box.

## Experience

- Editorial homepage with three manually selected render previews and collection entrances.
- Three collection detail views, original render lightboxes, creator-request buttons, distinct palettes and shared navigation.
- Twenty searchable catalogue SKUs: fourteen SIENNA, six HOI AN. Collection/category/name/SKU filters combine. Original millimetre dimensions and product names retained. Walnut is an independent room study, not an invented third SKU catalogue.
- One lazy-initialised Three.js viewer and WebGL context. Exhibitions and all twenty full-detail product GLBs are served locally in this site. Switching collection releases previous geometry, textures and active models; cancelled/obsolete requests cannot replace the latest selection.
- Walnut cutaway: orbit, pinch and curated guided viewpoints. SIENNA and HOI AN: overview, collision-aware walking, simultaneous mobile joystick/look, keyboard WASD, native zone picker and full-detail product inspection. Drawer and door pivots animate as in the source models.
- Guided Tour follows curated camera stops, with pause/resume/previous/next/exit. Pauses for contact dialogs or loss of focus. Respect reduced-motion preferences.
- Expanded viewer with collection and zone controls, Escape exit, focus management and preserved modal scroll lock. On phones product details sit below the camera canvas.
- Material Explorer with actual render details/crops, not generated replacements.
- Creator page, supplied avatar, Muhammad Rizky credit and WhatsApp drafts to 6281393177004. All visible file-request controls use the shared popup; no message sends automatically. This is contact UI, not access control for public files.

## Source assets

dist/assets/manifest.json is the catalogue and collection registry. Scripts/prepare-assets.mjs can recopy originals when the three sibling source checkouts exist; it checks hashes and does not delete or edit sources. The deployed website is self-contained for images, fonts, Three/Draco, exhibitions and individual GLBs. Native Blender files and original high-resolution downloads remain on the original three public projects, listed in the manifest and available via creator requests. The new website does not claim a new combined native .blend scene.

```
node scripts/prepare-assets.mjs
node scripts/prepare-assets.mjs --check-links
```

See ASSET-PROVENANCE.md and verification/asset-copy-audit.json for byte-identical copies, original licences and reconstruction limits. Original designs/catalogue photography remain with their owners. Source-link checks are HEAD-only; no WhatsApp message is sent by tests. Walnut 8K render master and SIENNA/HOI AN 4K originals retain their original locations and resolution; web JPEGs are lighter derivatives.

## Publish manually on GitHub Pages

Push this entire folder to a new public repository, main branch. In Settings > Pages choose GitHub Actions. The supplied .github/workflows/pages.yml runs npm test and publishes dist/. No Vercel account, framework build or API secrets required. Preserve the case and punctuation of SKU filenames. Keep ordinary git assets under 100 MiB; do not use Git LFS for GLBs served directly through Pages.

For additional collections, add their source metadata/assets to the registry and update the collection selectors and accepted IDs in dist/core.js. Native scenes do not need to be rebuilt to edit website copy or navigation.

## Verification and limitations

npm test checks routing, catalogue filtering, WhatsApp draft safety, mobile joystick input, product dimensions, all twenty GLBs, exhibit counts, original-copy hashes, English UI and file size limits. npm run qa uses installed Chrome with desktop/mobile viewport and real touch emulation; local screenshots and reports are stored in ignored .local/. Use --url=https://your-pages-url/ to repeat against the deployed site.

High-detail geometry is demanding on old phones. Only the selected collection is loaded and idle views render on demand, but no universal frame rate or physical-device testing is claimed. A failed WebGL session does not prevent render browsing or file requests. Browser lighting/reflections differ from native Cycles/EEVEE. Models are visual reconstructions, not manufacturer CAD. There is no shopping checkout or invented product pricing.
