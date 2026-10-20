import {escapeHtml as esc} from './core.js?v=madison-1';

// Supplied catalogue crops are separate from this website's render details.
// Upstream photography/CGI and calibrated physical samples are not verified.
export function cataloguePhoto(product) {
  const source=product.sourceCatalogue||(product.collection==='hoi-an'?'NEW HOI AN CATALOGUE 2026':'SIENNA CATALOGUE 2026');
  const brand=product.sourceBrand||'Living Ikon';
  const sharedBed=product.category==='beds'&&product.imageShared!==false;
  return {
    image:product.thumbnail,
    caption:`${product.collectionName} / ${product.name} / ${product.sku} — Original catalogue image. Source: ${source}, ${brand}.${sharedBed?' The catalogue shares one bed image between Queen and King sizes.':''}${product.sku==='50534.0'?' This is a lifestyle-image crop of the armchair.':''}`,
    request:`a conversation about ${product.collectionName} ${product.name} (${product.sku}), its catalogue reference and reconstructed 3D model`,
    inspect:`#/gallery/${product.collection}?product=${encodeURIComponent(product.sku)}`,
    source,brand,size:product.imageSize||[800,600],
    note:sharedBed?'The catalogue uses one image for Queen and King beds. The dimensions and 3D model follow the selected SKU.':'The supplied catalogue crop is shown at its available resolution, without AI enhancement.',
  };
}

export function photoButton(product,className='catalogue-photo') {
  const photo=cataloguePhoto(product);
  return `<button class="${esc(className)}" data-image="${esc(photo.image)}" data-photo-sku="${esc(product.sku)}" data-caption="${esc(photo.caption)}" data-request="${esc(photo.request)}" data-request-label="Ask about this piece" data-inspect="${esc(photo.inspect)}" aria-label="Enlarge catalogue image: ${esc(product.collectionName+' '+product.name+', '+product.sku)}"><img src="${esc(photo.image)}" alt="${esc(product.collectionName+' '+product.name)} — original catalogue reference" width="${photo.size[0]}" height="${photo.size[1]}" loading="lazy"><small class="photo-label">Original catalogue image</small><span class="photo-enlarge" aria-hidden="true">＋</span></button>`;
}

export function referenceCard(product) {
  const photo=cataloguePhoto(product);
  return `<article class="reference-card">${photoButton(product)}<p class="eyebrow">${esc(product.collectionName+' / '+product.sku)}</p><h3>${esc(product.name)}</h3><p class="reference-finish">${esc(product.finish)}</p><a class="text-link" href="${esc(photo.inspect)}">Inspect in 3D <span>↗</span></a></article>`;
}

export function featuredReferences(products,collectionId) {
  const matching=products.filter(p=>p.collection===collectionId);
  // Different product types provide context without pretending a thumbnail
  // is an independently photographed macro material sample.
  return (collectionId==='madison'?['seating','tables','storage']:['beds','storage','bedsides']).map(category=>matching.find(p=>p.category===category&&(category!=='storage'||/dresser/i.test(p.name)))||matching.find(p=>p.category===category)).filter(Boolean);
}
