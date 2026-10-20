import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {cataloguePhoto,photoButton,referenceCard,featuredReferences} from '../dist/catalogue-photos.js';

const manifest=JSON.parse(readFileSync(new URL('../dist/assets/manifest.json',import.meta.url),'utf8'));
const products=manifest.products;

test('all 28 catalogue references use existing local images and exact 3D deep links',()=>{
  for(const p of products){
    const photo=cataloguePhoto(p),html=photoButton(p);
    assert.equal(photo.image,p.thumbnail);
    assert.ok(readFileSync(new URL('../dist/'+photo.image,import.meta.url)).length>0);
    assert.equal(photo.inspect,`#/gallery/${p.collection}?product=${p.sku}`);
    assert.ok(photo.caption.includes(p.sku)&&photo.caption.includes(p.sourceBrand||'Living Ikon'));
    assert.match(html,/Original catalogue image/);
    assert.doesNotMatch(html,/Actual material sample|Verified real-life|original catalogue photograph/i);
    assert.match(html,/loading="lazy"/);
    assert.match(html,/data-request-label="Ask about this piece"/);
  }
});

test('both collections disclose shared queen and king catalogue images',()=>{
  for(const id of ['sienna','hoi-an']){
    const beds=products.filter(p=>p.collection===id&&p.category==='beds');
    assert.equal(beds.length,2);
    const hashes=beds.map(p=>createHash('sha256').update(readFileSync(new URL('../dist/'+p.thumbnail,import.meta.url))).digest('hex'));
    assert.equal(hashes[0],hashes[1]);
    for(const p of beds){assert.match(cataloguePhoto(p).caption,/shares one bed image/);assert.match(cataloguePhoto(p).note,/selected SKU/);}
    assert.notEqual(beds[0].dimensions[0],beds[1].dimensions[0]);
  }
});

test('material references show bed, dresser and bedside, with no invented Walnut photographs',()=>{
  for(const id of ['sienna','hoi-an']){
    const featured=featuredReferences(products,id);
    assert.deepEqual(featured.map(p=>p.category),['beds','storage','bedsides']);
    assert.equal(featured[1].sku,id==='sienna'?'LV463-B61':'LV453.B61');
    assert.ok(featured.every(p=>p.collection===id));
  }
  assert.deepEqual(featuredReferences(products,'walnut'),[]);
});

test('catalogue metadata remains escaped in images, captions, requests and links',()=>{
  const p={...products[0],name:'<img src=x onerror="alert(1)">',finish:'Warm <script> & brown',sku:'A" data-x="bad'};
  for(const html of [photoButton(p),referenceCard(p)]){
    assert.ok(!html.includes('<img src=x'));
    assert.ok(!html.includes('<script>'));
    assert.match(html,/&lt;img/);
    assert.ok(!html.includes('data-x="bad'));
  }
});

test('Madison keeps MARINER provenance, native image sizes and distinct sofa references',()=>{
  const pieces=products.filter(p=>p.collection==='madison');assert.equal(pieces.length,8);
  for(const p of pieces){const photo=cataloguePhoto(p);assert.equal(photo.brand,'MARINER');assert.equal(photo.source,'CLASSIC FURNITURE CATALOG 2023');assert.deepEqual(photo.size,p.imageSize);assert.ok(photo.size.every(n=>n>0));assert.doesNotMatch(photo.caption,/Living Ikon|shares one bed/);}
  assert.deepEqual(featuredReferences(products,'madison').map(p=>p.category),['seating','tables','storage']);
  const sofaImages=pieces.filter(p=>p.category==='seating').map(p=>createHash('sha256').update(readFileSync(new URL('../dist/'+p.thumbnail,import.meta.url))).digest('hex'));
  assert.equal(new Set(sofaImages).size,3);
});
