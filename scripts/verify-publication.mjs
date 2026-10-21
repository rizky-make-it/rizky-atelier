import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),base='https://rizky-make-it.github.io/rizky-atelier/';
const manifestBytes=await readFile(new URL('dist/assets/manifest.json',root));
const manifest=JSON.parse(manifestBytes),c=manifest.collections.find(c=>c.id==='nantes');
assert.equal(manifest.collections.length,7);assert.equal(manifest.products.length,72);
const paths=[c.exhibition,c.scene,c.hero,...c.renders.map(r=>r.image),...c.renders.map(r=>new URL(r.sourceUrl).pathname.replace('/rizky-atelier/','')),...c.materials.map(r=>r.image),...c.roomReferences.map(r=>r.image),...c.files.map(f=>new URL(f.sourceUrl).pathname.replace('/rizky-atelier/','')),...manifest.products.filter(p=>p.collection==='nantes').flatMap(p=>[p.model,p.thumbnail]),'assets/collections/nantes/source-reference.json','assets/collections/nantes/collection.json','downloads/nantes/render-proof.json'];
const urls=[...new Set(paths)].map(p=>new URL(p,base).href),results=[];
for(let i=0;i<urls.length;i+=6){results.push(...await Promise.all(urls.slice(i,i+6).map(async url=>{const r=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,url);return{url,status:r.status,bytes:r.headers.get('content-length')};})));}
const response=await fetch(new URL('assets/manifest.json?verify='+Date.now(),base));assert.equal(response.status,200);const remote=Buffer.from(await response.arrayBuffer()),hash=b=>createHash('sha256').update(b).digest('hex');
assert.equal(hash(remote),hash(manifestBytes),'Published manifest differs from tested checkout');
const info=await(await fetch(new URL(c.scene,base))).json();assert.equal(info.layout,'furnished-interior');assert.equal(info.walls,true);assert.equal(info.roof,true);assert.equal(info.placements.length,35);
const report={ok:true,checkedAt:new Date().toISOString(),siteUrl:base,collections:7,catalogueProducts:72,nantesProducts:22,nantesPlacements:35,manifestSHA256:hash(remote),urlCount:results.length,results};
await mkdir(new URL('.local/',root),{recursive:true});await writeFile(new URL('.local/nantes-publication.json',root),JSON.stringify(report,null,2));
console.log(JSON.stringify({ok:true,urlCount:results.length,manifestSHA256:report.manifestSHA256}));
