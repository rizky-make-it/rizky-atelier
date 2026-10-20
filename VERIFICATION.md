# Rizky Atelier — verification

Built from the three existing read-only showcase projects on 20 October 2026. Full local browser and mobile suites have passed. Publication/live verification are still in progress.

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

These are Chrome desktop and emulated mobile/touch tests, not physical-device testing. High-detail models do not carry a universal FPS guarantee. Original renders remain native Blender outputs, not AI substitutes. Reconstructed furniture is not official manufacturer CAD.
