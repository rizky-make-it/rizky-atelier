# Asset provenance

RIZKY ATELIER combines three existing projects by Muhammad Rizky. Original projects are read-only inputs; this website does not modify or replace them. `scripts/prepare-assets.mjs` copies the named browser assets byte-for-byte, checks SHA-256, extracts real product / articulation counts from GLB metadata, and writes `dist/assets/manifest.json`. Detailed source paths, byte sizes and checksums are recorded in `verification/asset-copy-audit.json`. No native Blender archive or original high-resolution PNG is duplicated in the new website.

## Walnut Bedroom / Ruang

Source: `../walnut-room/dist/`. This is an independent mid-century bedroom study based on the owner-supplied visual reference, **not a catalogue collection**. It has no invented catalogue SKUs. The combined manifest uses `productCount: 0`, `placementCount: null`, and `movingParts: null`; these mean not catalogued / not asserted, rather than a claim that the room is empty.

The principal web image and four material detail crops derive from the original Blender Cycles master at 7680 × 5416 pixels. A smaller web JPEG is not described as the lossless native master. The GLB is the existing optimised browser cutaway; its real-time lighting and environment reflections differ from the native Cycles render.

PBR source maps: **Natural Walnut Veneer**, Jenelle van Heerden / Poly Haven, <https://polyhaven.com/a/natural_walnut_veneer>; **Brown Leather**, Rob Tuytel / Poly Haven, <https://polyhaven.com/a/brown_leather>. Both CC0. The owner's reference image is not redistributed as a new texture or catalogue entry.

Original website: <https://rizky-make-it.github.io/walnut-room/>. Source repository: <https://github.com/rizky-make-it/walnut-room>. The local source has historical Sites metadata, but the public GitHub Pages address and built deployment were independently verified before adding these links. The combined site serves its copied GLB and smaller web images locally; the original native files remain on the original project website and can be requested from the creator.

## SIENNA 2026

Source: `../sienna-house/dist/`. Original website: <https://rizky-make-it.github.io/sienna-house-2026/>. Source repository: <https://github.com/rizky-make-it/sienna-house-2026>.

Fourteen catalogue SKUs, seventeen exhibition placements, thirty-two drawer / door articulation pivots. Counts are obtained from the actual exported exhibition GLB. Catalogue names and dimensions are retained from the existing product metadata. Product listing photos are crops from **SIENNA CATALOGUE 2026.pdf**, Living Ikon, supplied by the project owner; they are reference photographs, not reconstructed renders. Gallery images are smaller derivatives of actual Blender EEVEE UHD 4K renders. The Warm Brown finish, concealed surfaces, joinery and complementary exhibition styling are interpretations, not manufacturing specifications.

Ash Veneer texture: Jenelle van Heerden / Poly Haven, <https://polyhaven.com/a/ash_veneer>, CC0, stained to interpret LCV09 Warm Brown. The tallboy is labelled “2 Over 4 Drawers” in the catalogue but shows four wide drawer fronts; the existing model follows the photograph. Its four pivots are not changed to six merely to match the title. Names and dimensions remain as supplied, including the page-5 lamp table dimensions.

## HOI AN 2026

Source: `../hoi-an-catalogue/dist/`. Original website: <https://rizky-make-it.github.io/hoi-an-catalogue-2026/>. Source repository: <https://github.com/rizky-make-it/hoi-an-catalogue-2026>.

Six catalogue SKUs, twelve exhibition placements and twenty-eight drawer pivots, verified from the actual exhibition GLB. Reference: **NEW HOI AN CATALOGUE 2026.pdf**, Living Ikon, three scanned pages, supplied by the project owner. Product photo thumbnails are original catalogue crops. Gallery JPEGs derive from four original Blender EEVEE 3840 × 2160 renders and a 1600 × 2100 weave close-up. The exhibition GLB uses the existing simplified mesh budget; individual product GLBs preserve the existing higher detail.

Ash Veneer texture: Jenelle van Heerden / Poly Haven, <https://polyhaven.com/a/ash_veneer>, CC0, stained to interpret LCM127 Golden Syrup. This generic photographed ash substrate does not certify the manufacturer's timber species. Weave spacing, unseen joinery, drawer internals, freestanding mirror supports, bedding and display styling are visual interpretations. Beds have distinct catalogue widths; printed length × width × height is normalised to width × depth × height in the product metadata.

## Rights, libraries and contact

These are independent visual reconstructions, **not official manufacturer CAD**, fabrication drawings or manufacturer-endorsed websites. Product designs and original catalogue photography remain with their respective rights holders. Confirm permission for commercial redistribution with the catalogue owner. No ownership of those references is claimed.

Shared libraries and fonts are copied unchanged from the existing HOI AN website: Three.js 0.186.1 (MIT), Draco decoder (Apache 2.0), DM Sans and Instrument Serif (SIL Open Font License). Original licence notices remain under `dist/assets/vendor/three` and `dist/assets/vendor/legal`.

The Muhammad Rizky profile illustration was supplied by the project owner. The public WhatsApp destination is the creator-supplied number +62 813-9317-7004. The combined website's file-request popup is a contact workflow, not access control: publicly hosted GLBs, images and source repositories remain directly accessible. Draft messages must never be sent automatically.
