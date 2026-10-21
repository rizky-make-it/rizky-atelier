import {escapeHtml as esc} from './core.js?v=nantes-1';

// Supplied catalogue crops are separate from this website's render details.
// Upstream photography/CGI and calibrated physical samples are not verified.
export function cataloguePhoto(product) {
  const source=product.sourceCatalogue||(product.collection==='hoi-an'?'NEW HOI AN CATALOGUE 2026':'SIENNA CATALOGUE 2026');
  const brand=product.sourceBrand||'Living Ikon';
  const sharedBed=product.category==='beds'&&product.imageShared!==false;
  return {
    image:product.thumbnail,
    caption:`${product.collectionName} / ${product.name} / ${product.sku} — Original catalogue image. Source: ${source}, ${brand}.${sharedBed?' The catalogue shares one bed image between Queen and King sizes.':''}${product.sku==='50534.0'?' This is a lifestyle-image crop of the armchair.':''}${product.referenceNote?' '+product.referenceNote:''}`,
    request:`a conversation about ${product.collectionName} ${product.name} (${product.sku}), its catalogue reference and reconstructed 3D model`,
    inspect:`#/gallery/${product.collection}?product=${encodeURIComponent(product.sku)}`,
    source,brand,size:product.imageSize||[800,600],
    label:['50491.0','50376.0'].includes(product.sku)?'Shared family reference':'Original catalogue image',
    note:product.referenceNote|| (sharedBed?'The catalogue uses one image for Queen and King beds. The dimensions and 3D model follow the selected SKU.':'The supplied catalogue crop is shown at its available resolution, without AI enhancement.'),
  };
}

export function photoButton(product,className='catalogue-photo') {
  const photo=cataloguePhoto(product);
  return `<button class="${esc(className)}" data-image="${esc(photo.image)}" data-photo-sku="${esc(product.sku)}" data-caption="${esc(photo.caption)}" data-request="${esc(photo.request)}" data-request-label="Ask about this piece" data-inspect="${esc(photo.inspect)}" aria-label="Enlarge catalogue image: ${esc(product.collectionName+' '+product.name+', '+product.sku)}"><img src="${esc(photo.image)}" alt="${esc(product.collectionName+' '+product.name)} — ${esc(photo.label)}" width="${photo.size[0]}" height="${photo.size[1]}" loading="lazy"><small class="photo-label">${esc(photo.label)}</small><span class="photo-enlarge" aria-hidden="true">＋</span></button>`;
}

export function referenceCard(product) {
  const photo=cataloguePhoto(product);
  return `<article class="reference-card">${photoButton(product)}<p class="eyebrow">${esc(product.collectionName+' / '+product.sku)}</p><h3>${esc(product.name)}</h3><p class="reference-finish">${esc(product.finish)}</p><a class="text-link" href="${esc(photo.inspect)}">Inspect in 3D <span>↗</span></a></article>`;
}

export function featuredReferences(products,collectionId) {
  const matching=products.filter(p=>p.collection===collectionId);
  if(collectionId==='nantes')return ['50375.0','50339.0','50381.0'].map(sku=>matching.find(p=>p.sku===sku)).filter(Boolean);
  if(collectionId==='wellington')return ['50292.0','50296.0','50297.0'].map(sku=>matching.find(p=>p.sku===sku)).filter(Boolean);
  if(collectionId==='trianon')return ['50472.0','50475.1','50411.0'].map(sku=>matching.find(p=>p.sku===sku)).filter(Boolean);
  // Different product types provide context without pretending a thumbnail
  // is an independently photographed macro material sample.
  return (collectionId==='madison'?['seating','tables','storage']:['beds','storage','bedsides']).map(category=>matching.find(p=>p.category===category&&(category!=='storage'||/dresser/i.test(p.name)))||matching.find(p=>p.category===category)).filter(Boolean);
}
