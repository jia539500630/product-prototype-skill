import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const prototypePath = new URL('../prototypes/ip-order-list.html', import.meta.url);

test('order-list prototype is self-contained and exposes the required workbench regions', async () => {
  const html = await readFile(prototypePath, 'utf8');

  assert.match(html, /--primary:\s*#079c66/i);
  assert.match(html, /class="sidebar"/);
  assert.match(html, /class="filter-panel"/);
  assert.match(html, /class="order-table"/);
  assert.match(html, /class="pagination"/);
  assert.doesNotMatch(html, /https?:\/\//);
});
