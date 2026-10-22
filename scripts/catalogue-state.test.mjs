import test from 'node:test';
import assert from 'node:assert/strict';
import {readCatalogueState, catalogueHash} from '../dist/catalogue-state.js';

test('catalogue links restore collection, category and the exact search text', () => {
  const state = {collection: 'belgravia', category: 'seating', query: '50044.0'};
  assert.deepEqual(readCatalogueState(catalogueHash(state), ['belgravia']), state);
});

test('catalogue search survives reserved URL characters and Unicode', () => {
  const state = {collection: 'all', category: 'all', query: 'Oak & gilt / café + 2'};
  assert.deepEqual(readCatalogueState(catalogueHash(state), []), state);
  assert.equal(catalogueHash(), '#/products');
});

test('unknown catalogue filters fall back to usable defaults', () => {
  assert.deepEqual(readCatalogueState('#/products?collection=missing&category=unknown&q=chair', ['sienna']), {collection: 'all', category: 'all', query: 'chair'});
  assert.equal(readCatalogueState('#/products?q=' + 'a'.repeat(500), []).query.length, 160);
});
