# Rizky Atelier — verification

Built from the three existing read-only showcase projects on 20 October 2026. Publication and final verification are in progress; no unfinished live checks are represented as passed here.

## Completed checks

- npm test: 12 passing unit tests, plus static checks of the three exhibitions, all twenty individual GLBs, exact metadata dimensions, articulation counts, local file paths, English markup, asset size limits, and SHA-256 original-copy evidence.
- Browser page suite: homepage, three collection views, twenty-item catalogue, combined filters, SKU search, empty-state reset, material galleries, native nested image/contact dialogs, creator avatar, per-file WhatsApp drafts and menu navigation passed.
- All three exhibitions loaded in the shared Three.js viewer. SIENNA: 17 placements, 32 moving pivots. HOI AN: 12 placements, 28 pivots. Walnut: complete room-study cutaway, no invented catalogue products. Only one exhibition remains active after switching.
- All twenty individual product GLBs decoded successfully in Chrome. SIENNA buffet inspection verified both drawer translation and door rotation, then complete closing back to base transforms.
- Guided Tour start, pause, previous/next and exit were tested on all three collections. Collection navigation aborts obsolete requests; render browsing does not eagerly download GLBs.
- Mobile suite passed 320/360/390/430 px portrait layouts and 844 x 390 landscape: real CDP multi-touch joystick plus simultaneous swipe-look, release/cancel stop, pinch and button zoom, actual furniture raycast selection, full-detail inspection, product sheet below canvas, expanded collection/zone selection, current viewport height, 44 px targets, contact scroll lock and bottom navigation.
- Twenty-seven original source/project/download URLs returned HTTP 200 in HEAD-only checks. Original website/native/render files were not changed. Tests never opened WhatsApp or sent a message.

Reports and screenshots are retained under ignored .local/. Machine-readable asset provenance and source-link evidence are tracked in verification/. Final local/live browser evidence will be added after the current full suite and publication finish.

These are Chrome desktop and emulated mobile/touch tests, not physical-device testing. High-detail models do not carry a universal FPS guarantee. Original renders remain native Blender outputs, not AI substitutes. Reconstructed furniture is not official manufacturer CAD.
