# Rizky Atelier — verification

Completed and published on 20 October 2026. Full local browser/mobile verification and live GitHub Pages verification have passed.

Live: https://rizky-make-it.github.io/rizky-atelier/
Source: https://github.com/rizky-make-it/rizky-atelier

## Completed checks

- npm test: 12 passing unit tests, plus static checks of the three exhibitions, all twenty individual GLBs, exact metadata dimensions, articulation counts, local file paths, English markup, asset size limits, and SHA-256 original-copy evidence.
- Browser page suite: homepage, three collection views, twenty-item catalogue, combined filters, SKU search, empty-state reset, material galleries, native nested image/contact dialogs, creator avatar, per-file WhatsApp drafts and menu navigation passed.
- All three exhibitions loaded in the shared Three.js viewer. SIENNA: 17 placements, 32 moving pivots. HOI AN: 12 placements, 28 pivots. Walnut: complete room-study cutaway, no invented catalogue products. Only one exhibition remains active after switching.
- All twenty individual product GLBs decoded successfully in Chrome. SIENNA buffet inspection verified both drawer translation and door rotation, then complete closing back to base transforms.
- Guided Tour start, pause, previous/next and exit were tested on all three collections. Collection navigation aborts obsolete requests; render browsing does not eagerly download GLBs.
- Mobile suite passed 320/360/390/430 px portrait layouts and 844 x 390 landscape: real CDP multi-touch joystick plus simultaneous swipe-look, release/cancel stop, pinch and button zoom, actual furniture raycast selection, full-detail inspection, product sheet below canvas, expanded collection/zone selection, current viewport height, 44 px targets, contact scroll lock and bottom navigation.
- Twenty-seven original source/project/download URLs returned HTTP 200 in HEAD-only checks. Original website/native/render files were not changed. Tests never opened WhatsApp or sent a message.

Machine-readable local-browser.json, local-mobile.json and local-pages.json are supplied under verification/. Screenshots are retained under ignored .local/. The complete local suite recorded all three exhibitions, all twenty decoded product GLBs and real multi-touch checks, with zero runtime exceptions, console errors or HTTP failures.

The initial Linux deployment check caught Git text normalisation changing byte hashes for a source scene JSON and font licence copied from Windows. The source-copy check was retained: .gitattributes now preserves every dist/assets byte unchanged across platforms, and those two assets were restaged from the unmodified originals. This is a packaging correction, not a change to the original projects or a weakening of validation.

## Live publication checks

- GitHub Pages is public with HTTPS enforced. Successful application deployments: runs 39435784765 (1c761bb) and 39436631508 (85c4cdc).
- The full live suite passed all three exhibitions, twenty actual GLB decodes, drawer/door animation, guided controls, cancelled-request navigation, lazy loading, page routes, catalogue filters, material lightboxes and creator contact. It also exercised real simultaneous joystick/look, cancel/release stop, pinch, actual furniture taps, product inspection, expanded collection/zone selection, 320–430 px portrait and 844 × 390 landscape.
- The later keyboard skip-link adjustment (85c4cdc) was checked in a fresh live page suite, including focus staying inside the correct route, English pages, all catalogue views, contact dialogs and phone menu. The 3D engine was unchanged by this accessibility-only update.
- Both live reports record zero runtime exceptions, console errors and HTTP failures. No WhatsApp link was opened and no message was sent.
- Evidence: verification/github-pages-browser.json and verification/github-pages-pages.json. The final subsequent documentation-only commit does not alter the tested application.
- All three original project working trees were checked clean at handoff. Their public websites and native assets were not edited or replaced.

These are Chrome desktop and emulated mobile/touch tests, not physical-device testing. High-detail models do not carry a universal FPS guarantee. Original renders remain native Blender outputs, not AI substitutes. Reconstructed furniture is not official manufacturer CAD.

## Catalogue-image update — 20 October 2026

- 16 unit tests pass, including all twenty image/SKU mappings, shared Queen/King image disclosure in both collections, material reference choices and escaped metadata. Existing GLB, dimensions, source-byte hashes and GitHub asset-size checks still pass.
- The updated full local Chrome suite passes all three exhibitions and twenty GLB decodes, plus all twenty catalogue-image dialogs without eager GLB requests. Collection and Material views distinguish original catalogue images from reconstructed render details; Walnut has no invented catalogue photographs.
- Photo → exact-SKU 3D → matching source image passes for SIENNA LV463-B61 on desktop and HOI AN LV453.B61 on emulated phone. Nested contact dialogs, focus restoration and expanded-viewer scroll lock pass without sending WhatsApp messages.
- Image/reference layouts pass 320/360/390/430 px portrait and 844 × 390 landscape. The existing actual touch/raycast/walk/zoom/tour/drawer tests also pass. Zero runtime exceptions, console errors and HTTP failures were recorded.
- All original images, GLBs and source projects remain unchanged. Source images are 800 × 600 catalogue crops, not verified physical material samples or AI-enhanced images. See verification/catalogue-images-local.json for the updated local browser result.

## MADISON addition — 21 October 2026

- 18 unit tests and all static/GLB/source-copy/size checks pass. The combined registry now contains4collections and28exact dimensioned SKUs; prior source hashes are preserved.
- Reopened-native audit:8Madison SKUs,12placements,7cameras,4packed PBR images,0unverified moving parts, no walls/roof. Sofa outside dimensions match within0.001mm; fine casegood trims extend the nominal footprint by at most2.5mm. The source declares walnut burl veneer, not solid walnut.
- Five actual Blender EEVEE renders are3840×2160; two details1600×1600. PNG hashes and native/source evidence are packaged. No AI image substitutes. Native render and web GLB lighting differ.
- Full local Chrome suite passes all4exhibitions and all28decoded GLBs. Madison guided stops, reference dialogs and exact-SKU source→model→source paths pass. Existing drawer/door animations, cancellation, filters, contact drafts and all original collections remain intact.
- Desktop and emulated320/360/390/430pxportrait,844×390landscape and actual CDP multi-touch tests pass. Zero runtime exceptions, console errors or HTTP failures. No WhatsApp message was sent. No physical-device FPS guarantee.
- Evidence: verification/madison-local-browser.json; published native/source/render audits under dist/downloads/madison/ and dist/assets/collections/madison/.
