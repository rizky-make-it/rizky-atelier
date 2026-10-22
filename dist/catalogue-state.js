const categories = new Set(['all', 'beds', 'bedsides', 'storage', 'tables', 'seating', 'mirrors']);

export function readCatalogueState(hash, collectionIds) {
  const url = new URL(String(hash || '#/products').replace(/^#/, ''), 'https://atelier.local');
  const collection = url.searchParams.get('collection');
  const category = url.searchParams.get('category');
  return {
    collection: collectionIds.includes(collection) ? collection : 'all',
    category: categories.has(category) ? category : 'all',
    query: (url.searchParams.get('q') || '').slice(0, 160),
  };
}

export function catalogueHash({collection = 'all', category = 'all', query = ''} = {}) {
  const params = new URLSearchParams();
  if (collection !== 'all') params.set('collection', collection);
  if (categories.has(category) && category !== 'all') params.set('category', category);
  if (query.trim()) params.set('q', query.trim());
  return '#/products' + (params.size ? '?' + params : '');
}
