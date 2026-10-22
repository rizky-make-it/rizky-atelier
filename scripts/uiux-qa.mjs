import {spawn} from 'node:child_process';
import {mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const arg = (name, fallback) => process.argv.find(a => a.startsWith(name + '='))?.slice(name.length + 1) || fallback;
const siteUrl = arg('--url', 'http://127.0.0.1:4176/');
const out = path.resolve(root, arg('--out', '.local/uiux-qa'));
await mkdir(out, {recursive: true});
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const browser = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-background-networking',
  '--remote-debugging-port=9251', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
  '--user-data-dir=' + path.join(out, 'chrome-profile'), 'about:blank',
], {windowsHide: true, stdio: 'ignore'});
let socket, sequence = 0, evaluate;
const pending = new Map(), errors = [], requests = [], screenshots = [];
try {
  let version;
  for (let i = 0; i < 80; i++) { try { version = await (await fetch('http://127.0.0.1:9251/json/version')).json(); break; } catch { await pause(250); } }
  assert.ok(version, 'Chrome did not start');
  const target = await (await fetch('http://127.0.0.1:9251/json/new?about:blank', {method: 'PUT'})).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, {once: true}); socket.addEventListener('error', reject, {once: true}); });
  socket.addEventListener('message', e => {
    const d = JSON.parse(e.data);
    if (d.id && pending.has(d.id)) { const p = pending.get(d.id); clearTimeout(p.timer); pending.delete(d.id); d.error ? p.reject(Error(JSON.stringify(d.error))) : p.resolve(d.result); }
    if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
    if (d.method === 'Network.responseReceived' && d.params.response.status >= 400) errors.push(d.params.response.status + ' ' + d.params.response.url);
    if (d.method === 'Network.requestWillBeSent') requests.push(d.params.request.url);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence, timer = setTimeout(() => { pending.delete(id); reject(Error('CDP timeout: ' + method)); }, 45000);
    pending.set(id, {resolve, reject, timer}); socket.send(JSON.stringify({id, method, params}));
  });
  evaluate = async expression => {
    const result = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true, userGesture: true});
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const until = async (expression, seconds = 30) => {
    for (let i = 0; i < seconds * 5; i++) { if (await evaluate(expression)) return; await pause(200); }
    throw Error('Timed out: ' + expression);
  };
  const click = selector => evaluate('document.querySelector(' + JSON.stringify(selector) + ').click()');
  const input = (selector, value, type = 'input') => evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event(${JSON.stringify(type)},{bubbles:true}));})()`);
  const navigate = async hash => { await evaluate('location.hash=' + JSON.stringify(hash)); await until('location.hash.startsWith(' + JSON.stringify('#' + hash.split('?')[0]) + ')'); await pause(180); };
  const viewport = (width, height) => send('Emulation.setDeviceMetricsOverride', {width, height, deviceScaleFactor: 1, mobile: width <= 760});
  const shot = async name => {
    await evaluate('Promise.all([...document.images].filter(i=>{const r=i.getBoundingClientRect();return r.width&&r.top<innerHeight&&r.bottom>0}).map(i=>i.decode().catch(()=>{})))');
    const result = await send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false});
    await writeFile(path.join(out, name), Buffer.from(result.data, 'base64')); screenshots.push(name);
  };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', {cacheDisabled: true});
  await viewport(1440, 960);
  const url = new URL(siteUrl); url.searchParams.set('qa', Date.now());
  await send('Page.navigate', {url: url.href});
  await until('window.atelier?.ready'); await evaluate('document.fonts.ready.then(()=>true)');
  const layouts = [];
  for (const [width, height] of [[1440,960],[1024,768],[768,1024],[320,568],[360,740],[390,844],[430,932],[844,390]]) {
    await viewport(width, height);
    for (const route of ['/', '/products', '/collections', '/materials/belgravia', '/studio', '/gallery/belgravia']) {
      await navigate(route); await evaluate('scrollTo({top:0,behavior:"instant"})');
      assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'), true, 'Horizontal overflow: ' + width + ' ' + route);
      if (route === '/') {
        assert.equal(await evaluate('getComputedStyle(document.querySelector(".hero-picker")).display!=="none"'), width<=1000);
        if (width<=760) { await input('#hero-preview', 'sienna', 'change'); assert.match(await evaluate('document.querySelector("#hero-caption").textContent'), /SIENNA/); }
        await shot('home-' + width + '.png');
      }
      if (route === '/products') {
        assert.ok(await evaluate('parseFloat(getComputedStyle(document.querySelector(".product-card h3")).fontSize)>=14'));
        assert.ok(await evaluate('document.querySelector("#product-search").getBoundingClientRect().height>=44'));
        await shot('catalogue-' + width + '.png');
      }
      layouts.push({width, height, route});
    }
  }
  // Tablet menu and keyboard focus remain usable after dismissal.
  await viewport(768, 1024); await navigate('/'); await click('#menu-toggle');
  assert.equal(await evaluate('document.querySelector("#menu-toggle").getAttribute("aria-expanded")'), 'true');
  await send('Input.dispatchKeyEvent', {type:'keyDown', key:'Escape', code:'Escape'});
  await send('Input.dispatchKeyEvent', {type:'keyUp', key:'Escape', code:'Escape'});
  assert.equal(await evaluate('document.activeElement.id'), 'menu-toggle');
  assert.equal(await evaluate('document.querySelector("#menu-toggle").getAttribute("aria-expanded")'), 'false');
  // Real touch opens the catalogue directly from the mobile navigation.
  await viewport(390, 844); await navigate('/'); await send('Emulation.setTouchEmulationEnabled', {enabled:true, maxTouchPoints:2});
  const point=await evaluate('(()=>{const r=document.querySelector(".mobile-nav [data-mobile-nav=products]").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
  await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,...point}]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await until('document.body.dataset.page==="products"');
  // A real product round trip must keep filters, URL and scroll position.
  await viewport(1440, 960); await navigate('/products?collection=belgravia');
  await input('#product-search', 'chair'); await click('[data-category="seating"]');
  const filterHash = await evaluate('location.hash');
  assert.match(filterHash, /category=seating/); assert.match(filterHash, /q=chair/);
  await evaluate('scrollTo({top:380,behavior:"instant"})'); await pause(100);
  const before = await evaluate('scrollY');
  await click('.product-card .product-inspect');
  await until('atelier.gallery?.ready&&atelier.gallery.mode==="product"&&!atelier.gallery.loading', 150);
  assert.equal(await evaluate('document.querySelector("#back-catalogue").hash'), filterHash);
  await shot('product-desktop.png');
  await click('#back-catalogue'); await until('document.body.dataset.page==="products"'); await pause(300);
  assert.equal(await evaluate('location.hash'), filterHash);
  assert.equal(await evaluate('document.querySelector("#product-search").value'), 'chair');
  assert.equal(await evaluate('document.querySelector("[data-category=seating]").getAttribute("aria-pressed")'), 'true');
  assert.ok(Math.abs((await evaluate('scrollY'))-before)<3, 'Catalogue scroll was lost');
  await send('Page.reload', {ignoreCache: true}); await until('window.atelier?.ready');
  assert.equal(await evaluate('document.querySelector("#product-search").value'), 'chair');
  await click('#reset-catalogue'); assert.equal(await evaluate('location.hash'), '#/products');
  assert.equal(await evaluate('document.querySelectorAll(".product-card").length'), await evaluate('atelier.data.products.length'));
  await evaluate('scrollTo({top:380,behavior:"instant"})');
  await click('.product-card .product-inspect'); await until('document.body.dataset.page==="gallery"');
  assert.equal(await evaluate('document.querySelector("#back-catalogue").hash'), '#/products');
  await click('#back-catalogue'); await until('document.body.dataset.page==="products"');
  await until('Math.abs(scrollY-380)<3');
  // Inspect sources and nested contact without navigating to WhatsApp or sending anything.
  await click('.product-card [data-photo-sku]'); await until('document.querySelector("#image-dialog").open&&document.querySelector("#image-full").naturalWidth>0');
  await click('#image-request'); assert.equal(await evaluate('document.querySelector("#contact-dialog").open'), true);
  assert.equal(await evaluate('document.querySelector("#contact-intro").textContent'), 'Want a project like this? Get in touch with me on WhatsApp.');
  assert.equal(new URL(await evaluate('document.querySelector("#contact-whatsapp").href')).pathname, '/6281393177004');
  await click('#close-contact'); assert.equal(await evaluate('document.body.style.overflow'), 'hidden');
  await click('#close-image'); await until('document.body.style.overflow===""');
  assert.equal(requests.some(url=>url.includes('wa.me/')), false);
  assert.deepEqual(errors, []);
  const report = {ok:true,siteUrl,layouts,filterReturn:true,filterReload:true,tabletKeyboard:true,mobileTouchNavigation:true,referenceContact:true,whatsappSent:false,screenshots,errors};
  await writeFile(path.join(out,'report.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));
  socket.send(JSON.stringify({id: ++sequence, method: 'Browser.close'})); await pause(200);
} catch(error) {
  let state;try{state=await evaluate?.('({hash:location.hash,page:document.body.dataset.page,width:innerWidth,scroll:scrollY})');}catch{}
  await writeFile(path.join(out,'failure.json'),JSON.stringify({error:String(error),state,errors},null,2));throw error;
} finally {
  socket?.close();for(const p of pending.values())clearTimeout(p.timer);
  if(browser.exitCode===null)browser.kill();
}
