import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {cataloguePhoto,photoButton,referenceCard,featuredReferences} from '../dist/catalogue-photos.js';

const manifest=JSON.parse(readFileSync(new URL('../dist/assets/manifest.json',import.meta.url),'utf8'));
const products=manifest.products;

test('all 50 catalogue references use existing local images and exact 3D deep links',()=>{
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

test('Trianon keeps seven unique references, square table shape and shared rectangular-image disclosure',()=>{
  const pieces=products.filter(p=>p.collection==='trianon');assert.equal(pieces.length,7);assert.equal(new Set(pieces.map(p=>p.sku)).size,7);
  for(const p of pieces){assert.equal(cataloguePhoto(p).brand,'MARINER');assert.deepEqual(cataloguePhoto(p).size,p.imageSize);}
  assert.deepEqual(pieces.find(p=>p.sku==='50475.1').dimensions,[1400,1400,470]);
  assert.deepEqual(pieces.find(p=>p.sku==='50476.1').dimensions,[1700,950,470]);
  assert.match(cataloguePhoto(pieces.find(p=>p.sku==='50476.1')).caption,/shared|accompanies both|not an isolated/i);
  assert.deepEqual(featuredReferences(products,'trianon').map(p=>p.sku),['50472.0','50475.1','50411.0']);
  const p={...pieces[0],referenceNote:'<script>alert("test")</script>'};assert.doesNotMatch(photoButton(p),/<script>/);
});
test('Wellington keeps fifteen distinct SKUs and discloses the shared red two-seat family image',()=>{
  const pieces=products.filter(p=>p.collection==='wellington');assert.equal(pieces.length,15);
  const red=pieces.filter(p=>['50490.0','50491.0'].includes(p.sku));assert.equal(red.length,2);
  const hashes=red.map(p=>createHash('sha256').update(readFileSync(new URL('../dist/'+p.thumbnail,import.meta.url))).digest('hex'));assert.equal(hashes[0],hashes[1]);
  const two=pieces.find(p=>p.sku==='50491.0');assert.deepEqual(two.dimensions,[1800,950,950]);assert.match(cataloguePhoto(two).note,/SHARED FAMILY IMAGE/);assert.equal(cataloguePhoto(two).label,'Shared family reference');
  for(const p of pieces){assert.equal(cataloguePhoto(p).brand,'MARINER');assert.deepEqual(cataloguePhoto(p).size,p.imageSize);}
  assert.deepEqual(featuredReferences(products,'wellington').map(p=>p.sku),['50292.0','50296.0','50297.0']);
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
