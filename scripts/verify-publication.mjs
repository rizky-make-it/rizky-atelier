import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),base='https://rizky-make-it.github.io/rizky-atelier/';
const manifestBytes=await readFile(new URL('dist/assets/manifest.json',root));
const id=process.argv.find(a=>a.startsWith('--collection='))?.slice(13)||'belgravia';
const manifest=JSON.parse(manifestBytes),c=manifest.collections.find(c=>c.id===id);assert.ok(c?.layout==='furnished-interior');
assert.equal(manifest.collections.length,8);assert.equal(manifest.products.length,94);
const paths=[c.exhibition,c.scene,c.hero,...c.renders.map(r=>r.image),...c.renders.map(r=>new URL(r.sourceUrl).pathname.replace('/rizky-atelier/','')),...c.materials.map(r=>r.image),...c.roomReferences.map(r=>r.image),...c.files.map(f=>new URL(f.sourceUrl).pathname.replace('/rizky-atelier/','')),...manifest.products.filter(p=>p.collection===id).flatMap(p=>[p.model,p.thumbnail]),'assets/collections/'+id+'/source-reference.json','assets/collections/'+id+'/collection.json','downloads/'+id+'/render-proof.json'];
const urls=[...new Set(paths)].map(p=>new URL(p,base).href),results=[];
for(let i=0;i<urls.length;i+=6){results.push(...await Promise.all(urls.slice(i,i+6).map(async url=>{const r=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,url);return{url,status:r.status,bytes:r.headers.get('content-length')};})));}
const response=await fetch(new URL('assets/manifest.json?verify='+Date.now(),base));assert.equal(response.status,200);const remote=Buffer.from(await response.arrayBuffer()),hash=b=>createHash('sha256').update(b).digest('hex');
assert.equal(hash(remote),hash(manifestBytes),'Published manifest differs from tested checkout');
const entryHashes={};for(const file of ['index.html','app.js','core.js','catalogue-photos.js','gallery.js','style.css','responsive.css','catalogue-state.js']){const r=await fetch(new URL(file+'?verify='+Date.now(),base));assert.equal(r.status,200);const bytes=Buffer.from(await r.arrayBuffer()),local=await readFile(new URL('dist/'+file,root));assert.equal(hash(bytes),hash(local),'Published entry differs: '+file);entryHashes[file]=hash(bytes);}
const info=await(await fetch(new URL(c.scene,base))).json();assert.equal(info.layout,'furnished-interior');assert.equal(info.walls,true);assert.equal(info.roof,true);assert.equal(info.placements.length,c.placementCount);
const report={ok:true,checkedAt:new Date().toISOString(),siteUrl:base,collections:8,catalogueProducts:94,collection:id,products:c.productCount,placements:c.placementCount,manifestSHA256:hash(remote),entrySHA256:entryHashes,urlCount:results.length,results};
await mkdir(new URL('.local/',root),{recursive:true});await writeFile(new URL('.local/'+id+'-publication.json',root),JSON.stringify(report,null,2));
console.log(JSON.stringify({ok:true,urlCount:results.length,manifestSHA256:report.manifestSHA256}));
