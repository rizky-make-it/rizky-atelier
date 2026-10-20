# Asset provenance

RIZKY ATELIER combines three existing projects by Muhammad Rizky and the newly authored MADISON collection. Original projects are read-only inputs; this website does not modify or replace them. `scripts/prepare-assets.mjs` copies original browser assets byte-for-byte, checks SHA-256, extracts real product/articulation counts and registers MADISON. Original copy evidence remains in `verification/asset-copy-audit.json`. Native files and high-resolution PNGs for the three previous projects retain their original locations; newly authored MADISON native files and PNGs are included under `dist/downloads/madison/`.

## Walnut Bedroom / Ruang

Source: `../walnut-room/dist/`. This is an independent mid-century bedroom study based on the owner-supplied visual reference, **not a catalogue collection**. It has no invented catalogue SKUs. The combined manifest uses `productCount: 0`, `placementCount: null`, and `movingParts: null`; these mean not catalogued / not asserted, rather than a claim that the room is empty.

The principal web image and four material detail crops derive from the original Blender Cycles master at 7680 × 5416 pixels. A smaller web JPEG is not described as the lossless native master. The GLB is the existing optimised browser cutaway; its real-time lighting and environment reflections differ from the native Cycles render.

PBR source maps: **Natural Walnut Veneer**, Jenelle van Heerden / Poly Haven, <https://polyhaven.com/a/natural_walnut_veneer>; **Brown Leather**, Rob Tuytel / Poly Haven, <https://polyhaven.com/a/brown_leather>. Both CC0. The owner's reference image is not redistributed as a new texture or catalogue entry.

Original website: <https://rizky-make-it.github.io/walnut-room/>. Source repository: <https://github.com/rizky-make-it/walnut-room>. The local source has historical Sites metadata, but the public GitHub Pages address and built deployment were independently verified before adding these links. The combined site serves its copied GLB and smaller web images locally; the original native files remain on the original project website and can be requested from the creator.

## SIENNA 2026

Source: `../sienna-house/dist/`. Original website: <https://rizky-make-it.github.io/sienna-house-2026/>. Source repository: <https://github.com/rizky-make-it/sienna-house-2026>.

Fourteen catalogue SKUs, seventeen exhibition placements, thirty-two drawer / door articulation pivots. Counts are obtained from the actual exported exhibition GLB. Catalogue names and dimensions are retained from the existing product metadata. Product listing images are crops from **SIENNA CATALOGUE 2026.pdf**, Living Ikon, supplied by the project owner; they are original catalogue references, not this website's reconstructed renders. The catalogue's original photography versus CGI is not independently verified. Gallery images are smaller derivatives of actual Blender EEVEE UHD 4K renders. The Warm Brown finish, concealed surfaces, joinery and complementary exhibition styling are interpretations, not manufacturing specifications.

Ash Veneer texture: Jenelle van Heerden / Poly Haven, <https://polyhaven.com/a/ash_veneer>, CC0, stained to interpret LCV09 Warm Brown. The tallboy is labelled “2 Over 4 Drawers” in the catalogue but shows four wide drawer fronts; the existing model follows the photograph. Its four pivots are not changed to six merely to match the title. Names and dimensions remain as supplied, including the page-5 lamp table dimensions.

## HOI AN 2026

Source: `../hoi-an-catalogue/dist/`. Original website: <https://rizky-make-it.github.io/hoi-an-catalogue-2026/>. Source repository: <https://github.com/rizky-make-it/hoi-an-catalogue-2026>.

Six catalogue SKUs, twelve exhibition placements and twenty-eight drawer pivots, verified from the actual exhibition GLB. Reference: **NEW HOI AN CATALOGUE 2026.pdf**, Living Ikon, three scanned pages, supplied by the project owner. Product thumbnails are original catalogue crops. Gallery JPEGs derive from four original Blender EEVEE 3840 × 2160 renders and a 1600 × 2100 weave close-up. The exhibition GLB uses the existing simplified mesh budget; individual product GLBs preserve the existing higher detail.

Ash Veneer texture: Jenelle van Heerden / Poly Haven, <https://polyhaven.com/a/ash_veneer>, CC0, stained to interpret LCM127 Golden Syrup. This generic photographed ash substrate does not certify the manufacturer's timber species. Weave spacing, unseen joinery, drawer internals, freestanding mirror supports, bedding and display styling are visual interpretations. Beds have distinct catalogue widths; printed length × width × height is normalised to width × depth × height in the product metadata.

## Rights, libraries and contact

## MADISON / MARINER Classic Furniture 2023

Source: the owner's CLASSIC_FURNITURE_CATALOG_2023.pdf,139PDF pages, SHA256
ce8ec15e3c67e962c5d3c308ecc60eaf10f2983652b4537c410c17dbe3a5df24.
Only MADISON on PDF pages13–20 (printed24–39) is reconstructed; only those
eight spreads are redistributed as the requested collection reference.
This is a MARINER collection, not a Living Ikon collection.

Eight exact dimensioned SKUs, twelve exhibition placements, zero moving
hardware. All three sofa sizes retain distinct widths and3/2/1seat cushions.
Seven reference images retain original JPEG bytes, and the armchair has its
own native-density lifestyle crop; output/madison/reference/products.json and
assets/collections/madison/source-reference.json record native dimensions,
image xrefs/crop rectangles and individual checksums. No source image is
AI-enhanced or presented as a calibrated physical sample.

Native source: output/madison/. Authored model detail includes curved tubs,
diamond-displaced upholstery, real buttons and piping, cast/chased bronze
geometry, marble inset tops and open TV cubbies. The cabinet panel remains
fixed; the PDF does not establish opening hardware. Walnut burl veneer,
cast bronze and Calacatta are the stated collection materials. Procedural
PBR maps interpret them; exact finish/fabric calibration, hidden construction,
casting motifs, marble-vein placement, styling and hidden coffee-table leg
count are not manufacturer-certified. No original product design ownership
or commercial image licence is claimed; obtain permission from MARINER for
commercial redistribution.

Five genuine Blender EEVEE renders are3840×2160 and two detail renders1600×1600.
Original PNG hashes, a reopened-native dimensional/packed-map audit, local
asset checksums and source evidence are packaged with the delivery. The
native scene has seven cameras, four packed maps and no walls/roof. The
exhibition GLB is an optimised419,003-triangle derivative of755,858 triangles;
individual models preserve their full-detail geometry. No AI image replaces
a native render. Browser environment lighting and reflectivity differ from
native renders. The three previous websites and native source projects are
not changed by adding this collection to Rizky Atelier.

### Catalogue image presentation update

All twenty existing catalogue crops (800 × 600 pixels, eighteen unique images) are now available in source-labelled image dialogs, collection references, the Material Library and the selected-product 3D view. No source images, models or textures were changed or AI-enhanced. Both SIENNA bed SKUs share an identical reference image, as do both HOI AN bed SKUs; the interface discloses this while preserving each SKU's dimensions. “Original catalogue image” describes the supplied source, not independently verified upstream photography, a physical wood sample or guaranteed solid-wood construction. Colour, grain, lighting and material composition are not certified by these crops.

These are independent visual reconstructions, **not official manufacturer CAD**, fabrication drawings or manufacturer-endorsed websites. Product designs and original catalogue photography remain with their respective rights holders. Confirm permission for commercial redistribution with the catalogue owner. No ownership of those references is claimed.

Shared libraries and fonts are copied unchanged from the existing HOI AN website: Three.js 0.186.1 (MIT), Draco decoder (Apache 2.0), DM Sans and Instrument Serif (SIL Open Font License). Original licence notices remain under `dist/assets/vendor/three` and `dist/assets/vendor/legal`.

The Muhammad Rizky profile illustration was supplied by the project owner. The public WhatsApp destination is the creator-supplied number +62 813-9317-7004. The combined website's file-request popup is a contact workflow, not access control: publicly hosted GLBs, images and source repositories remain directly accessible. Draft messages must never be sent automatically.

## TRIANON living-room addition

Source: the same user-supplied MARINER CLASSIC_FURNITURE_CATALOG_2023.pdf, SHA256 ce8ec15e3c67e962c5d3c308ecc60eaf10f2983652b4537c410c17dbe3a5df24, PDF pages 21–24 (printed 40–47). Seven unique printed references retain their millimetre dimensions. The repeated square coffee table counts once. Later dining/bedroom sections are not included. Page21's contextual round coffee table and vitrines are not relabelled as the seven selected models.

Native-resolution source images, raw JPEG/mask bytes, hashes, xrefs and transformations are documented in the packaged source evidence. Three source images use the original PDF soft masks composited onto the original white page background, without new segmentation, AI enhancement or super-resolution. The rectangular coffee table has only a shared detail composition, not a separately isolated labelled photograph; its footprint follows the printed 1700 × 950 mm dimensions and the rest is a disclosed adaptation. Images do not establish source photography versus CGI or licensed commercial reuse.

The ten-placement wall-free exhibition includes real crest openings, scroll medallions, leaf relief, rosettes, fluted shafts, capitals, gilt toes, cushion geometry and piping. Individual GLBs retain full evaluated geometry; the exhibition reduces 1,213,060 total triangles to 660,845. The native master packs five authored PBR maps (including a retained walnut-burl material-library map) and seven cameras. Five actual EEVEE PNGs are 3840 × 2160; two detail images are 1600 × 1600. No AI bitmap substitutes for any render. Original PNG, native, catalogue and copied-file hashes are included.

Materials are procedural visual interpretations, not manufacturer scans: antique-gold leaf/cast bronze, piano-black lacquer, sage velvet, Emperor marble and Calacatta. Precise carving topology, joinery, underside/rear construction, fibre calibration, veneer layout, marble veining and finish colour are not verified. No new moving hardware is invented. This is independent visual reconstruction, not official manufacturer CAD or endorsement. All earlier collection assets and the three original source project working trees remain unchanged.

## WELLINGTON living-room addition

The next supplied MARINER section, PDF pages 25–31 (printed 48–61), contains fifteen unique living-room SKUs: six seating variants, five tables/consoles, two mirrors, a glass cabinet and a TV piece. Native-resolution image evidence records original JPEGs, soft masks, native crops and PDF mirroring. The red two-seat 50491.0 has dimensions but no isolated image: its original three-seat family image is explicitly shared and labelled, not synthesised into a false product photograph. Lifestyle mirror/console/TV crops retain occlusions; one TV edge is clipped in the original composition.

The two seating families are geometrically distinct. Navy has hard medallion side panels, rear tufting and finials; burgundy has tufted sides and a smooth rear. White-frame armchair 50294.2 retains its reversed frame scheme. Tables have black lacquer tops with white inlay and curved white stretchers, never marble; the round coffee table has six legs. Two glass shelves form three cabinet display levels. Cabinet/TV mechanisms remain fixed because their engineering is not established. Independent mirror exhibition supports are staging, not catalogue mounting hardware.

Twenty wall-free placements, ten cameras and five packed authored maps form the editable native scene. Seven actual EEVEE renders are 3840 × 2160, three details 1600 × 1600; selected views temporarily isolate their display products to avoid occlusion, without changing geometry. Individual GLBs retain evaluated detail and the exhibition uses an optimisation pass. Glass uses a documented transparent thin-sheet real-time approximation, not a calibrated optical sample. Velvet, damask, lacquer, brass, gold and figured brown panels are visual interpretations; no timber species, solid-wood construction, exact casting topology, finish calibration or official CAD status is claimed. Original image/design rights remain with their owners. Earlier collection assets and source projects remain unchanged.
