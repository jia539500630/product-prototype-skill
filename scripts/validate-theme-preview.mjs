import { readFileSync } from 'node:fs';
const file=process.argv[2];
if(!file){console.error('Usage: node scripts/validate-theme-preview.mjs <file>');process.exit(2)}
let html;try{html=readFileSync(file,'utf8')}catch{console.error('ERROR: unreadable file');process.exit(2)}
const errors=[];
if(/<script\b[^>]*\bsrc=|<link\b[^>]*\bhref=|\bhref=|<SOURCE_|<PRIMARY_|#SRC/i.test(html)) errors.push('external dependency or placeholder');
const matches=[...html.matchAll(/<script\s+id="theme-contract"\s+type="application\/json"[^>]*>([\s\S]*?)<\/script>/g)];
if(matches.length!==1) errors.push('requires one theme-contract');
let c={};try{c=JSON.parse(matches[0]?.[1]??'')}catch{errors.push('invalid contract JSON')}
const groups=['tokens','typography','layout','components','specimens']; const ids=new Set();
if(c.schemaVersion!==1)errors.push('schemaVersion must be 1');
for(const g of groups){if(!Array.isArray(c[g]))errors.push(`${g} must be an array`);for(const x of c[g]||[]){if(!x.id||ids.has(x.id))errors.push('duplicate or missing id');ids.add(x.id);if(!['source','inferred','fallback','chrome'].includes(x.provenance)||!Array.isArray(x.evidence)||!x.evidence.length)errors.push(`invalid record ${x.id}`)}}
for(const tag of html.matchAll(/<([\w-]+)([^>]*data-contract-id="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g)){const [, ,attrs,id,body]=tag;const record=[...groups.flatMap(g=>c[g]||[])].find(x=>x.id===id);if(!record)errors.push(`missing contract id ${id}`);else if(!attrs.includes(`data-evidence="${record.provenance}"`))errors.push(`evidence mismatch ${id}`);else if(record.provenance==='inferred'&&!body.includes('推断'))errors.push(`inferred label missing ${id}`);else if(record.provenance==='fallback'&&!/(模拟|未在产物中确认)/.test(body))errors.push(`fallback label missing ${id}`)}
if(errors.length){for(const e of errors)console.error(`ERROR: ${e}`);process.exit(1)}console.log(`VALID: ${file}`);
