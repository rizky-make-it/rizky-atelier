# RIZKY ATELIER — The Living Gallery

Created by Muhammad Rizky. A single, English-language digital showroom combining Walnut Bedroom, SIENNA 2026, HOI AN 2026, MADISON, TRIANON and WELLINGTON living room from the MARINER Classic Furniture Catalogue 2023. Shared navigation, catalogue, material library, contact workflow and one native WebGL viewer. No iframes or external website switching are used for the primary experience. The three original projects and the completed Madison/Trianon assets remain unchanged.

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

- Editorial homepage with six manually selected render previews and collection entrances.
- Six collection detail views, original render lightboxes, creator-request buttons, distinct palettes and shared navigation.
- Fifty searchable catalogue SKUs: fourteen SIENNA, six HOI AN, eight MADISON, seven TRIANON and fifteen WELLINGTON. Collection/category/name/SKU filters combine. Original millimetre dimensions and product names retained. Walnut is an independent room study, not an invented SKU catalogue.
- All fifty supplied catalogue image mappings can be enlarged without loading WebGL. Image dialogs link to the exact SKU's 3D model and creator contact. Collection and Materials views show source references separately from reconstructed Blender details; selected 3D products expose the matching catalogue image and source information.
- One lazy-initialised Three.js viewer and WebGL context. Exhibitions and all fifty full-detail product GLBs are served locally in this site. Switching collection releases previous geometry, textures and active models; cancelled/obsolete requests cannot replace the latest selection.
- Walnut cutaway: orbit, pinch and curated guided viewpoints. SIENNA and HOI AN: overview, collision-aware walking, simultaneous mobile joystick/look, keyboard WASD, native zone picker and full-detail product inspection. Drawer and door pivots animate as in the source models.
- Guided Tour follows curated camera stops, with pause/resume/previous/next/exit. Pauses for contact dialogs or loss of focus. Respect reduced-motion preferences.
- Expanded viewer with collection and zone controls, Escape exit, focus management and preserved modal scroll lock. On phones product details sit below the camera canvas.
- Material Explorer with actual render details/crops, not generated replacements.
- Creator page, supplied avatar, Muhammad Rizky credit and WhatsApp drafts to 6281393177004. All visible file-request controls use the shared popup; no message sends automatically. This is contact UI, not access control for public files.

## MADISON delivery

Eight distinct references:50532.0 /50533.0 /50534.0 sofas,50535.0 coffee table,
50353.0 side table,50536.0 TV furniture,50537.0 /50538.0 consoles. The open
exhibition contains12 placements and no invented moving hardware. The native
master, complete rebuild ZIP, five3840×2160 Blender EEVEE renders, two1600×1600
material details and the Madison-only reference PDF are in dist/downloads/madison/.
Individual GLBs, exhibition GLB, local web images, source metadata and checksums
are in dist/assets/collections/madison/. Product geometry includes real displaced
diamond tufting/buttons, piped cushions, modelled cast/chased metal details,
marble insets and open cabinet cubbies. Four authored PBR maps are packed into
the editable native scene. See ASSET-PROVENANCE.md for interpretation limits.

The manufacturer's wood statement is walnut burl VENEER, not solid walnut.
The TV centre panel stays fixed because its hardware is not established.
Original source imagery is distinct from our Blender renders; the armchair
uses its own documented lifestyle crop, with no AI enhancement or upscaling.

## TRIANON delivery

Seven living-room references, PDF pages 21–24 (printed 40–47): 50472.0 / 50473.0 / 50474.0 seating, 50476.1 rectangular and 50475.1 square Emperor marble coffee tables, 50411.0 Calacatta console and 50412.1 Emperor side table. Ten placements form a wall-free sage-and-gold salon, conversation lounge and console gallery. The repeated square-table source listing counts once; later Trianon dining and bedroom sections are not included.

Native master, source ZIP, five actual 3840 × 2160 EEVEE renders, two 1600 × 1600 details and the four-spread reference PDF are under dist/downloads/trianon/. Individual full-detail models, exhibition LOD, native-density catalogue images and source/render/hash evidence are under dist/assets/collections/trianon/. True geometric details include open wreath crests, scrolling arms, acanthus friezes, corner rosettes, Corinthian capitals, fluted piano-black legs, gilt toe sleeves, tailored cushions and piping. The native scene packs five authored PBR maps and has seven cameras, with no inferred moving hardware.

The rectangular coffee table shares a source detail composition rather than an isolated labelled product view; only its dimensions are explicitly printed. Original PDF soft masks are faithfully composited over their original white background where required and all transformations are evidenced. Hidden construction, exact carving motifs and material calibration are visual interpretations, not manufacturer CAD. The contextual lifestyle round table and vitrines are not mislabelled as these selected SKUs.

## WELLINGTON delivery

Fifteen living-room references from PDF pages 25–31 (printed 48–61) become twenty placements across navy and burgundy salons, a paired two-seat study, a console/mirror gallery and a media display. Six seating SKUs preserve their distinct construction: navy hard medallion panels, rear tufting and finials; white-frame navy armchair; burgundy tufted sides and smooth rear. Tables have black lacquer tops, physical white inlays and curved white stretchers, not marble. The round coffee table has six legs. Cabinet has two glass shelves/three levels; both mirrors and both console widths are separate inspectable products.

The editable native master, rebuild ZIP, seven actual 3840 × 2160 EEVEE renders, three 1600 × 1600 details and reference subset PDF live under dist/downloads/wellington/. Fifteen individual GLBs, exhibition LOD, native-density reference images and source/hash audits are in dist/assets/collections/wellington/. Ten cameras and five authored PBR maps are packed. Hidden cabinet/TV opening mechanisms are not invented; mirror stands are exhibition staging.

The red two-seat 50491.0 has printed dimensions but no dedicated image, so its thumbnail is visibly labelled Shared family reference and uses the exact original three-seat source image; its two-seat geometry is dimension-led. Lifestyle mirror/console/TV crops retain source occlusion. Dark figured-panel species is not declared by the source; no solid-wood or calibrated material claim is made. All earlier collection assets remain unchanged.

## Source assets

dist/assets/manifest.json is the catalogue and collection registry. Scripts/prepare-assets.mjs can recopy originals when the three sibling source checkouts exist; it checks hashes and does not delete or edit sources. The deployed website is self-contained for images, fonts, Three/Draco, exhibitions and individual GLBs. Native Blender files and original high-resolution downloads remain on the original three public projects, listed in the manifest and available via creator requests. The new website does not claim a new combined native .blend scene.

```
node scripts/prepare-assets.mjs
node scripts/prepare-assets.mjs --check-links
```

See ASSET-PROVENANCE.md and verification/asset-copy-audit.json for byte-identical copies, original licences and reconstruction limits. Original designs/catalogue photography remain with their owners. Source-link checks are HEAD-only; no WhatsApp message is sent by tests. Walnut 8K render master and SIENNA/HOI AN 4K originals retain their original locations and resolution; web JPEGs are lighter derivatives.

The original twenty SIENNA/HOI AN catalogue references are800 × 600 images; MADISON retains its own native image dimensions, recorded per SKU. None are AI-enhanced replacements or verified physical material samples. Both SIENNA and HOI AN share one bed image between Queen and King SKUs; each 3D model retains its own dimensions. MADISON sofa images are distinct. Catalogue sources do not independently establish upstream photography versus CGI, solid-wood construction, or exact physical finish calibration. Walnut has no supplied product-catalogue images and remains clearly render-only.

## Publish manually on GitHub Pages

Push this entire folder to a new public repository, main branch. In Settings > Pages choose GitHub Actions. The supplied .github/workflows/pages.yml runs npm test and publishes dist/. No Vercel account, framework build or API secrets required. Preserve the case and punctuation of SKU filenames. Keep ordinary git assets under 100 MiB; do not use Git LFS for GLBs served directly through Pages.

For additional collections, add their source metadata/assets to the registry and accepted IDs in dist/core.js. Collection selectors and hero buttons derive from the registry. Native scenes do not need to be rebuilt to edit website copy or navigation.

## Verification and limitations

npm test checks routing, catalogue filtering, WhatsApp draft safety, mobile joystick input, product dimensions, all fifty GLBs, exhibit counts, original-copy hashes, native/render/source audits, English UI and file size limits. npm run qa uses installed Chrome with desktop/mobile viewport and real touch emulation; local screenshots and reports are stored in ignored .local/. Use --url=https://your-pages-url/ to repeat against the deployed site.

High-detail geometry is demanding on old phones. Only the selected collection is loaded and idle views render on demand, but no universal frame rate or physical-device testing is claimed. A failed WebGL session does not prevent render browsing or file requests. Browser lighting/reflections differ from native Cycles/EEVEE. Models are visual reconstructions, not manufacturer CAD. There is no shopping checkout or invented product pricing.
