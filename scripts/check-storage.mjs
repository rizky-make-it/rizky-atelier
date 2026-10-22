import {readdir, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
let totalBytes = 0, files = 0, maxFileBytes = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else {
      const {size} = await stat(file);
      assert.ok(size < 95 * 1024 * 1024, 'File exceeds the project limit: ' + file);
      totalBytes += size; files++; maxFileBytes = Math.max(maxFileBytes, size);
    }
  }
}
await walk(root);
console.log(JSON.stringify({totalBytes, files, maxFileBytes, maximumBytes: 1000000000, officialLimits: 'https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits'}));
assert.ok(totalBytes <= 1000000000, 'Published files exceed the GitHub Pages 1 GB limit');
