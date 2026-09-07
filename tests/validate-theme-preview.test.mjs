import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
const validator = join(process.cwd(), 'scripts/validate-theme-preview.mjs');
function run(html) { const f=join(mkdtempSync(join(tmpdir(),'tp-')),'p.html'); writeFileSync(f,html); return ()=>execFileSync(process.execPath,[validator,f],{encoding:'utf8',stdio:'pipe'}); }
const contract = '{"schemaVersion":1,"source":{},"stack":[],"tokens":[],"typography":[],"layout":[],"components":[{"id":"button","provenance":"source","evidence":["dom:.btn"]}],"specimens":[],"limitations":[],"generatedAt":"x"}';
test('accepts matching contract',()=>assert.doesNotThrow(run(`<section data-contract-id="button" data-evidence="source"></section><script id="theme-contract" type="application/json">${contract}</script>`)));
test('rejects external dependency',()=>assert.throws(run(`<link href="https://x.test/x.css"><script id="theme-contract" type="application/json">${contract}</script>`)));
