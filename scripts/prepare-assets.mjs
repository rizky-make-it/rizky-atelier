import { readFile, writeFile, mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

// Read-only originals; this script only creates/updates files under this new site.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sites = dirname(root);
const dist = join(root, 'dist');
const copied = [];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const slash = value => value.replaceAll('\\', '/');

async function copy(source, destination) {
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
  const [a, b] = await Promise.all([readFile(source), readFile(destination)]);
  assert.equal(hash(a), hash(b), `Copy differs: ${destination}`);
  copied.push({ source: slash(relative(sites, source)), destination: slash(relative(dist, destination)), bytes: b.length, sha256: hash(b) });
}

async function copyTree(source, destination) {
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.isDirectory()) await copyTree(join(source, entry.name), join(destination, entry.name));
    else if (entry.isFile()) await copy(join(source, entry.name), join(destination, entry.name));
  }
}

function glbJson(bytes) {
  assert.equal(bytes.toString('ascii', 0, 4), 'glTF');
  assert.equal(bytes.readUInt32LE(4), 2);
  assert.equal(bytes.readUInt32LE(16), 0x4e4f534a);
  return JSON.parse(bytes.toString('utf8', 20, 20 + bytes.readUInt32LE(12)));
}

const sources = {
  walnut: { folder: 'walnut-room', glb: 'bedroom.glb', images: ['bedroom-render.jpg', 'bedroom-render-small.jpg', 'detail-walnut.jpg', 'detail-cotton.jpg', 'detail-ochre.jpg', 'detail-leather.jpg'] },
  sienna: { folder: 'sienna-house', glb: 'sienna-house.glb', images: ['master.jpg', 'dining.jpg', 'living.jpg', 'guest.jpg', 'detail-wood.jpg'] },
  'hoi-an': { folder: 'hoi-an-catalogue', glb: 'hoi-an-exhibition.glb', images: ['overview.jpg', 'king.jpg', 'queen.jpg', 'storage.jpg', 'detail-weave.jpg'] },
};

const shared = join(sites, sources['hoi-an'].folder, 'dist/assets');
await copyTree(join(shared, 'vendor'), join(dist, 'assets/vendor'));
await copyTree(join(shared, 'fonts'), join(dist, 'assets/fonts'));
await copy(join(shared, 'muhammad-rizky-avatar.jpg'), join(dist, 'assets/muhammad-rizky-avatar.jpg'));

const collectionAssets = {};
const products = [];
for (const [id, source] of Object.entries(sources)) {
  const sourceAssets = join(sites, source.folder, 'dist/assets');
  const prefix = `assets/collections/${id}`;
  const destination = join(dist, prefix);
  const modelBytes = await readFile(join(sourceAssets, source.glb));
  const model = glbJson(modelBytes);
  const nodes = model.nodes ?? [];
  const placements = nodes.filter(n => n.extras?.kind === 'product');
  const moving = nodes.filter(n => n.extras?.kind === 'articulation');
  await copy(join(sourceAssets, source.glb), join(destination, source.glb));
  for (const name of source.images) await copy(join(sourceAssets, name), join(destination, name));
  const asset = { prefix, exhibition: `${prefix}/${source.glb}`, scene: null, placementCount: id === 'walnut' ? null : placements.length, movingParts: id === 'walnut' ? null : moving.length };
  if (id !== 'walnut') {
    await copy(join(sourceAssets, 'scene.json'), join(destination, 'scene.json'));
    asset.scene = `${prefix}/scene.json`;
    const scene = JSON.parse(await readFile(join(sourceAssets, 'scene.json'), 'utf8'));
    assert.equal(scene.placements.length, placements.length);
    assert.equal(scene.walls, 0);
    assert.equal(scene.roof, false);
    const inventory = JSON.parse(await readFile(join(sourceAssets, 'products.json'), 'utf8'));
    for (const p of inventory) {
      const category = p.category ?? (/B0[12]$/.test(p.sku) ? 'beds' : /B42$/.test(p.sku) ? 'bedsides' : /B71$/.test(p.sku) ? 'mirrors' : /(?:B51|B61|D21|L31)$/.test(p.sku) ? 'storage' : 'tables');
      const filename = basename(p.model);
      await copy(join(sourceAssets, 'models', filename), join(destination, 'models', filename));
      await copy(join(sourceAssets, 'catalogue', `${p.sku}.jpg`), join(destination, 'catalogue', `${p.sku}.jpg`));
      products.push({ ...p, category, collection: id, collectionName: id === 'sienna' ? 'SIENNA' : 'HOI AN', finish: p.finish ?? 'LCV09 Warm Brown', model: `${prefix}/models/${filename}`, thumbnail: `${prefix}/catalogue/${p.sku}.jpg` });
    }
    assert.equal(new Set(placements.map(n => n.extras.product_id)).size, inventory.length);
  }
  collectionAssets[id] = asset;
}

const url = {
  walnut: 'https://rizky-make-it.github.io/walnut-room/',
  sienna: 'https://rizky-make-it.github.io/sienna-house-2026/',
  'hoi-an': 'https://rizky-make-it.github.io/hoi-an-catalogue-2026/',
};
const repo = {
  walnut: 'https://github.com/rizky-make-it/walnut-room',
  sienna: 'https://github.com/rizky-make-it/sienna-house-2026',
  'hoi-an': 'https://github.com/rizky-make-it/hoi-an-catalogue-2026',
};
const original = (id, path) => url[id] ? new URL(path, url[id]).href : null;
const render = (id, filename, title, caption, download) => ({ image: `${collectionAssets[id].prefix}/${filename}`, title, caption, request: `the original ${id === 'hoi-an' ? 'HOI AN' : id === 'sienna' ? 'SIENNA' : 'Walnut Bedroom'} render: ${title}`, sourceUrl: original(id, download) });
const material = (id, filename, title, description) => ({ image: `${collectionAssets[id].prefix}/${filename}`, title, description });
const file = (id, title, extension, description, request, path) => ({ title, extension, description, request, sourceUrl: original(id, path) });

const collections = [
  {
    id: 'walnut', name: 'Walnut Bedroom', number: '01', kind: 'Room study', title: 'An intimate beginning.', tagline: 'Walnut. Ochre. Quiet warmth.',
    description: 'A mid-century bedroom study in rich walnut, crisp cotton, ochre textiles and cognac leather. The original room concept brings sculpted fabric and photographed PBR materials into one intimate interior.',
    finish: 'Walnut, ochre and cognac leather', hero: 'assets/collections/walnut/bedroom-render.jpg', ...collectionAssets.walnut, sourceSite: url.walnut, sourceRepo: repo.walnut, productCount: 0,
    palette: ['#5D3B2C', '#BA8E3A', '#F2EEE5', '#956747'],
    renders: [render('walnut', 'bedroom-render.jpg', 'Walnut & ochre', 'Original Blender Cycles room render. Native master: 7680 × 5416; this web JPEG is a smaller derivative.', 'downloads/bedroom-render-8k.jpg')],
    materials: [
      material('walnut', 'detail-walnut.jpg', 'Walnut grain', 'Photographed walnut PBR with satin roughness; a crop from the original Cycles render.'),
      material('walnut', 'detail-cotton.jpg', 'Woven cotton', 'Sculpted duvet folds, stitched edges and cross-woven textile relief.'),
      material('walnut', 'detail-ochre.jpg', 'Ochre texture', 'Warm woven textiles and modelled folds bring softness to the timber frame.'),
      material('walnut', 'detail-leather.jpg', 'Cognac leather', 'Photographed leather pores, variable roughness and double saddle stitching.'),
    ],
    files: [
      file('walnut', 'Native bedroom scene', '.BLEND', 'Editable scene, packed PBR textures, cameras and lighting.', 'the Walnut Bedroom native Blender scene (.blend)', 'downloads/bedroom.blend'),
      file('walnut', 'Interactive room model', '.GLB', 'Optimised browser cutaway with embedded textures.', 'the Walnut Bedroom interactive GLB room model', 'assets/bedroom.glb'),
      file('walnut', 'Original Cycles render', '8K JPG', 'Native 7680 × 5416 render; JPEG derivative of the lossless PNG master.', 'the original Walnut Bedroom native-resolution Cycles render (7680 × 5416)', 'downloads/bedroom-render-8k.jpg'),
      file('walnut', 'PBR texture sources', '.ZIP', 'Walnut and leather diffuse, normal and roughness maps.', 'the Walnut Bedroom PBR source textures and rebuild script', 'downloads/bedroom-pbr-textures.zip'),
    ],
  },
  {
    id: 'sienna', name: 'SIENNA', number: '02', kind: 'Catalogue collection', title: 'Precision in warm brown.', tagline: 'Chevron grain. Fine brass lines.',
    description: 'Four open displays connect the King suite, Queen and reading area, living collection and dining collection. Warm Brown ash and chevron geometry give fourteen catalogue pieces a distinct architectural rhythm.',
    finish: 'LCV09 Warm Brown', hero: 'assets/collections/sienna/guest.jpg', ...collectionAssets.sienna, sourceSite: url.sienna, sourceRepo: repo.sienna, productCount: 14,
    palette: ['#544332', '#AE9670', '#E9E5DB', '#444E42'],
    renders: [
      render('sienna', 'master.jpg', 'The open exhibition', 'Blender EEVEE exhibition overview. Original PNG: 3840 × 2160.', 'downloads/master-4k.png'),
      render('sienna', 'dining.jpg', 'A place to gather', 'Dining table, buffet and open display styling. Original PNG: 3840 × 2160.', 'downloads/dining-4k.png'),
      render('sienna', 'living.jpg', 'The living collection', 'Coffee, lamp and sofa tables with a TV unit. Original PNG: 3840 × 2160.', 'downloads/living-4k.png'),
      render('sienna', 'guest.jpg', 'Queen & reading', 'The Queen display and complementary reading vignette. Original PNG: 3840 × 2160.', 'downloads/guest-4k.png'),
    ],
    materials: [material('sienna', 'detail-wood.jpg', 'Chevron & brass', 'An actual Blender render detail: photographed ash, patterned grain and slender brass-tone framing interpret the Warm Brown catalogue finish.')],
    files: [
      file('sienna', 'Native exhibition scene', '.BLEND', '14 SKUs, 17 placements and packed textures.', 'the SIENNA Blender exhibition master scene (.blend)', 'downloads/sienna-house.blend'),
      file('sienna', 'Complete exhibition model', '.GLB', '17 placements and 32 animated drawer / door pivots.', 'the complete SIENNA exhibition GLB and fourteen individual models', 'assets/sienna-house.glb'),
      file('sienna', 'Project & rebuild sources', '.ZIP', 'Scene scripts, photographed textures and metadata.', 'the SIENNA Blender project, texture sources and rebuild scripts (.zip)', 'downloads/sienna-project.zip'),
      file('sienna', 'Original catalogue', '.PDF', 'Six-page supplied SIENNA Catalogue 2026 reference.', 'the original SIENNA Catalogue 2026 reference PDF', 'downloads/SIENNA-CATALOGUE-2026.pdf'),
      file('sienna', 'Website source', 'GITHUB', 'Original independent website and publishing guide.', 'the SIENNA website source and GitHub Pages deployment guide', '../'),
    ],
  },
  {
    id: 'hoi-an', name: 'HOI AN', number: '03', kind: 'Catalogue collection', title: 'Light through the weave.', tagline: 'Golden Syrup timber. Natural rattan.',
    description: 'Two bedroom displays, a storage gallery and a weave study bring all six catalogue pieces into one open exhibition. Interlaced solid reeds and genuine gaps let the details speak for themselves.',
    finish: 'LCM127 Golden Syrup', hero: 'assets/collections/hoi-an/king.jpg', ...collectionAssets['hoi-an'], sourceSite: url['hoi-an'], sourceRepo: repo['hoi-an'], productCount: 6,
    palette: ['#B18453', '#BBA377', '#EEEAE0', '#6E7658'],
    renders: [
      render('hoi-an', 'overview.jpg', 'The woven exhibition', 'The complete wall-free exhibition. Original Blender EEVEE PNG: 3840 × 2160.', 'downloads/overview-4k.png'),
      render('hoi-an', 'king.jpg', 'The King suite', 'Golden Syrup timber, woven rattan and olive bedding. Original PNG: 3840 × 2160.', 'downloads/king-4k.png'),
      render('hoi-an', 'queen.jpg', 'The Queen suite', 'White cotton softens the rattan and grained timber. Original PNG: 3840 × 2160.', 'downloads/queen-4k.png'),
      render('hoi-an', 'storage.jpg', 'The storage gallery', 'Six-drawer dresser, mirror and four-drawer tallboy. Original PNG: 3840 × 2160.', 'downloads/storage-4k.png'),
      render('hoi-an', 'detail-weave.jpg', 'An honest weave', 'Actual Blender EEVEE close-up of interlaced rattan. Original PNG: 1600 × 2100.', 'downloads/detail-weave.png'),
    ],
    materials: [material('hoi-an', 'detail-weave.jpg', 'Interlaced rattan', 'Individually modelled solid warp and weft ribbons, true openings, timber surrounds and a Golden Syrup finish.')],
    files: [
      file('hoi-an', 'Native exhibition scene', '.BLEND', '6 SKUs, 12 placements, packed textures and named cameras.', 'the HOI AN Blender exhibition master scene (.blend)', 'downloads/hoi-an-exhibition.blend'),
      file('hoi-an', 'Complete exhibition model', '.GLB', 'Optimised exhibition and six full-detail individual products.', 'the complete HOI AN exhibition GLB and six full-detail individual models', 'assets/hoi-an-exhibition.glb'),
      file('hoi-an', 'Project & rebuild sources', '.ZIP', 'Native scene, scripts, texture sources and modelling notes.', 'the HOI AN Blender project, textures, documentation and rebuild scripts (.zip)', 'downloads/hoi-an-project.zip'),
      file('hoi-an', 'Original catalogue', '.PDF', 'Three-page supplied NEW HOI AN Catalogue 2026 reference.', 'the original NEW HOI AN Catalogue 2026 reference PDF', 'downloads/NEW-HOI-AN-CATALOGUE-2026.pdf'),
      file('hoi-an', 'Website source', 'GITHUB', 'Original independent website and publishing guide.', 'the HOI AN website source and GitHub Pages deployment guide', '../'),
    ],
  },
];

// Website source is the GitHub repository, not a guessed relative site path.
for (const c of collections) for (const f of c.files) if (f.extension === 'GITHUB') f.sourceUrl = c.sourceRepo;
assert.equal(collections.length, 3);
assert.equal(products.length, 20);
assert.equal(new Set(products.map(p => p.sku)).size, 20);
assert.deepEqual(collections.map(c => c.productCount), [0, 14, 6]);
assert.deepEqual(collections.map(c => c.placementCount), [null, 17, 12]);
assert.deepEqual(collections.map(c => c.movingParts), [null, 32, 28]);
for (const p of products) {
  assert.ok(['beds', 'bedsides', 'storage', 'tables', 'seating', 'mirrors'].includes(p.category));
  assert.equal(p.dimensions.length, 3);
  assert.ok(p.dimensions.every(n => n > 0));
  for (const path of [p.model, p.thumbnail]) assert.ok((await stat(join(dist, path))).size > 0);
}
for (const c of collections) for (const path of [c.hero, c.exhibition, c.scene, ...c.renders.map(r => r.image), ...c.materials.map(m => m.image)].filter(Boolean)) assert.ok((await stat(join(dist, path))).size > 0);
await writeFile(join(dist, 'assets/manifest.json'), `${JSON.stringify({ collections, products }, null, 2)}\n`);
await mkdir(join(root, 'verification'), { recursive: true });
await writeFile(join(root, 'verification/asset-copy-audit.json'), `${JSON.stringify({ copiedFiles: copied.length, copiedBytes: copied.reduce((total, f) => total + f.bytes, 0), collections: collections.map(c => ({ id: c.id, products: c.productCount, placements: c.placementCount, movingParts: c.movingParts })), files: copied }, null, 2)}\n`);
if (process.argv.includes('--check-links')) {
  const urls = [...new Set(collections.flatMap(c => [c.sourceSite, c.sourceRepo, ...c.renders.map(r => r.sourceUrl), ...c.files.map(f => f.sourceUrl)]).filter(Boolean))];
  const results = await Promise.all(urls.map(async sourceUrl => {
    try {
      const response = await fetch(sourceUrl, { method: 'HEAD', signal: AbortSignal.timeout(20000) });
      return { sourceUrl, status: response.status };
    } catch (error) { return { sourceUrl, error: error.message }; }
  }));
  await writeFile(join(root, 'verification/source-links.json'), `${JSON.stringify({ checkedAt: new Date().toISOString(), method: 'HEAD', results }, null, 2)}\n`);
  assert.ok(results.every(r => r.status === 200), 'One or more original project links did not return HTTP 200; see verification/source-links.json.');
  console.log(`Verified ${results.length} original project and file URLs: HTTP 200.`);
}
console.log(JSON.stringify({ collections: collections.length, products: products.length, uniqueSkus: new Set(products.map(p => p.sku)).size, copiedFiles: copied.length, copiedBytes: copied.reduce((sum, f) => sum + f.bytes, 0), manifest: slash(relative(root, join(dist, 'assets/manifest.json'))) }));
