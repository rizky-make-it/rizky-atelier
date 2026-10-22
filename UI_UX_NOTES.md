# Responsive UI and navigation

The catalogue was difficult to scan on phones: small type, crowded collection previews, and filters that reset after inspecting a product. The responsive layer increases readable type and controls, uses a collection selector on phones and tablets, and gives mobile visitors direct access to All pieces. Desktop retains the existing editorial layout, fonts and palette.

Collection, category and search now remain in the catalogue URL. Returning from a product restores those filters and the previous scroll position, including the unfiltered catalogue. Source guidance is an expandable native details element. The original reference viewer, creator avatar, exact English WhatsApp introduction, draft number and public-file disclosure remain available. No WhatsApp message is sent.

The 3D toolbar, selection panel, safe-area spacing and touch targets adapt to portrait and landscape. Automatic product scrolling is immediate so controls do not move while a user taps. Existing model request fencing and Return to Interior behavior are retained.

Validation: 29 release unit tests plus the full asset/source/native/render checks; 48 browser page/viewport combinations across eight viewport sizes; catalogue filter/scroll return and reload; tablet Escape focus; real mobile touch navigation; original reference and nested contact dialogs. The combined local nine-collection worktree also passed 31 tests and the full mobile QA, including joystick, simultaneous swipe look, pinch, enclosed room views, and Return to Interior races. Evidence is in verification/uiux-*.json. Browser viewport emulation is not a physical-device test.

This publication contains only UI changes over 97e1b711e3c15d5e70dce1a996e72703cbe71bfe: eight existing showcases and 94 unique catalogue SKUs. All 390 existing asset/download files and the manifest retain their Git blob hashes. Published dist is 973,913,328 bytes with Git's Linux line endings (973,913,706 in the Windows worktree); every file is below 95 MiB. The local LANCASTER work and other uncommitted changes were preserved separately and are not included in this deployment.

Reproduce with npm test, npm run qa:ui, and npm run qa -- --mobile-only. For another base URL, pass --url=https://rizky-make-it.github.io/rizky-atelier/ to the QA scripts. Browser checks disable cache. The workflow checks the GitHub Pages storage budget before upload.
