# Theme Preview Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `theme-preview` so it produces a single, standalone prototype-baseline HTML document with visible evidence tiers and an embedded, non-rendering design contract.

**Architecture:** Keep the skill as the orchestration and extraction guide; place the contract schema and component-promotion rules in focused references. Replace the checklist-shaped skeleton with a linear prototype-contract page. Add a dependency-free Node validator that reads the embedded contract and checks the generated HTML's self-containment, provenance labels, and visible-to-contract consistency.

**Tech Stack:** Markdown skill instructions, self-contained HTML/CSS, JSON in `<script type="application/json">`, Node.js built-in `node:test` and `node:assert`.

---

## File structure

| Path | Responsibility |
| --- | --- |
| `skills/theme-preview/SKILL.md` | Entry workflow, output contract, evidence terminology, URL safeguards, output-name policy, acceptance checklist. |
| `skills/theme-preview/references/contract-schema.md` | Canonical embedded JSON schema and visible HTML mapping. |
| `skills/theme-preview/references/component-discovery.md` | Weighted component promotion and `source`/`inferred` distinctions. |
| `skills/theme-preview/references/framework-signatures.md` | Remove duplicate modal row and correct recursive CSS discovery command. |
| `skills/theme-preview/references/showcase-skeleton.html` | Neutral linear shell; no stock product widgets or product-color fallbacks. |
| `scripts/validate-theme-preview.mjs` | Standalone validator CLI. |
| `tests/validate-theme-preview.test.mjs` | Validator regression tests and temporary fixture setup. |

### Task 1: Define the embedded contract reference

**Files:**
- Create: `skills/theme-preview/references/contract-schema.md`

- [ ] **Step 1: Create the schema reference with the canonical JSON shape**

Include this exact contract example and field rules:

```html
<script id="theme-contract" type="application/json">
{
  "schemaVersion": 1,
  "source": {"kind": "url", "value": "https://example.test/app", "route": "/app"},
  "stack": [{"name": "Material-UI", "evidence": ["dom:.MuiButton"]}],
  "tokens": [{"id": "color-primary", "name": "primary", "value": "#673AB7", "kind": "color", "provenance": "source", "evidence": ["token:theme.palette.primary.main"]}],
  "typography": [],
  "layout": [],
  "components": [{"id": "mui-button", "name": "Button", "root": ".MuiButton-root", "provenance": "source", "evidence": ["dom:.MuiButton-root"], "slots": ["label"], "states": ["contained"]}],
  "specimens": [{"id": "dashboard-header", "name": "Dashboard header", "componentIds": ["mui-button"], "provenance": "inferred", "evidence": ["css:.dashboard-header"]}],
  "limitations": ["No runtime route traversal was performed."],
  "generatedAt": "2026-09-07T00:00:00.000Z"
}
</script>
```

Specify: `provenance` is exactly `source`, `inferred`, `fallback`, or `chrome`; every array record has a unique `id`, nonempty `evidence`, and provenance; `chrome` records must not be described as product tokens; visible blocks reference contract IDs with `data-contract-id`.

- [ ] **Step 2: Add the visible mapping and label requirements**

Document these required forms:

```html
<section data-component="mui-button" data-contract-id="mui-button" data-evidence="source">
  <span class="evidence-label">DOM 已观测</span>
</section>
<section data-component="date-picker" data-contract-id="date-picker" data-evidence="inferred">
  <span class="evidence-label">CSS/JS 推断</span>
</section>
<section data-component="empty-state" data-contract-id="empty-state" data-evidence="fallback">
  <span class="evidence-label">模拟／未在产物中确认</span>
</section>
```

State that `source` labels are visible as `已观测`, `inferred` labels include `推断`, and `fallback` labels include either `模拟` or `未在产物中确认`.

- [ ] **Step 3: Review the reference**

Run: `rg -n 'schemaVersion|data-contract-id|source|inferred|fallback|chrome' skills/theme-preview/references/contract-schema.md`

Expected: the schema example and all four provenance values are present.

- [ ] **Step 4: Commit**

```bash
git add skills/theme-preview/references/contract-schema.md
git commit -m "docs: define theme preview contract schema"
```

### Task 2: Rewrite discovery rules around confidence tiers

**Files:**
- Modify: `skills/theme-preview/references/component-discovery.md:18-72`
- Modify: `skills/theme-preview/references/framework-signatures.md:55-107`

- [ ] **Step 1: Replace the promotion rule with weighted scoring**

Replace the current two-signal-only rule with this decision table:

```markdown
| Signal | Score |
| --- | ---: |
| Runtime DOM repetition, stable slots, landmark role, or overlay structure | 2 |
| Dedicated CSS subtree with layout and state selectors | 1 |
| Matching exported/registered JS component symbol | 1 |

Promote at score >= 3 only when at least one structural signal exists. DOM-backed candidates are `source`; candidates supported only by CSS and/or JS are `inferred`. A lone framework signature is neither a component nor a component candidate.
```

Preserve the existing requirement to retain unknown product widgets, then add that a CSS/JS-only block must expose a root plus at least one child/slot/state before it can be demoed.

- [ ] **Step 2: Correct static analysis guidance**

Replace the non-recursive CSS example with:

```bash
rg -o '\.[A-Za-z][A-Za-z0-9_-]{2,}' <artifact-root> -g '*.css' | sort | uniq -c | sort -rn | head -120
```

In `framework-signatures.md`, merge the duplicate dialog/modal row into the primary dialog row and add one sentence: bundle signatures prove availability only; route use requires DOM, route markup, or a product wrapper reference.

- [ ] **Step 3: Verify terminology consistency**

Run: `rg -n '≥2|two or more|score >= 3|source|inferred' skills/theme-preview/references`

Expected: no old threshold remains; both confidence tiers are documented.

- [ ] **Step 4: Commit**

```bash
git add skills/theme-preview/references/component-discovery.md skills/theme-preview/references/framework-signatures.md
git commit -m "docs: tier inferred theme components"
```

### Task 3: Replace the showcase skeleton

**Files:**
- Modify: `skills/theme-preview/references/showcase-skeleton.html`

- [ ] **Step 1: Remove all pre-populated component demos**

Delete the Buttons, Forms, Tags, Table, generic other-components, Tree/Dialog, and Empty markup/CSS. Retain only reset styles and neutral layout primitives: `.page-header`, `.container`, `.section`, `.section-title`, `.card`, `.evidence-label`, `.provenance-note`, and responsive grid helpers.

- [ ] **Step 2: Use a neutral chrome token namespace**

Use these exact variable names and ensure all hardcoded shell colors are declared in `:root`:

```css
:root {
  --chrome-page-bg: #f6f7f9;
  --chrome-surface: #ffffff;
  --chrome-text: #1f2937;
  --chrome-muted: #6b7280;
  --chrome-border: #d1d5db;
  --chrome-radius: 8px;
}
```

Add a page-visible note: `文档壳样式（非来源产品主题）`.

- [ ] **Step 3: Add empty insertion points, not stock widgets**

Leave only section comments and empty containers for: source summary, theme/typography, observed components, inferred components, layout specimens, optional fallbacks, and limitations. Add exactly one embedded empty contract placeholder:

```html
<script id="theme-contract" type="application/json">{}</script>
```

Do not include `#SRC`, `<SOURCE_URL_OR_PATH>`, controls, `href`, external URLs, or `<script src>`.

- [ ] **Step 4: Validate the skeleton by search**

Run: `rg -n '#SRC|<SOURCE_URL_OR_PATH>|<PRIMARY_TOKEN>|<button|<input|<select|<textarea|href=|script src=' skills/theme-preview/references/showcase-skeleton.html`

Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add skills/theme-preview/references/showcase-skeleton.html
git commit -m "refactor: make theme preview skeleton evidence neutral"
```

### Task 4: Update the skill workflow and acceptance contract

**Files:**
- Modify: `skills/theme-preview/SKILL.md:6-120`

- [ ] **Step 1: Rewrite the purpose and output definition**

Replace the opening description with language that defines the output as a prototype baseline: it must extract theme, components, and layout conventions from an existing product and make them reusable constraints for later prototype generation. Link to `references/contract-schema.md`.

- [ ] **Step 2: Add evidence-tier and URL rules**

Define `source`, `inferred`, `fallback`, and `chrome` exactly as in Task 1. Add: do not provide credentials, bypass access control, or traverse unrelated routes; when rendering is unavailable, produce source-only analysis, populate `limitations`, and never call static signatures “observed”.

- [ ] **Step 3: Replace output workflow details**

Require a linear, no-sidebar page ordered as: summary; theme/typography; observed components; inferred components; layout specimens; optional fallback; limitations. Require an embedded `theme-contract` JSON block but prohibit rendering it. Require layout specimens to use only discovered/inferred components and visibly say `原型组合推断` unless the exact composition is directly observed.

- [ ] **Step 4: Add output naming and no-interaction policy**

Set the default filename to `theme-preview-<sanitized-product>.html`. If that path exists, use `theme-preview-<sanitized-product>-<YYYYMMDD-HHmmss>.html`; never overwrite a prior output silently. Define standalone as no external CSS/JS/font requests, no scripts except inert JSON contract, no form submission, and no navigable links. CSS-only visual states and animations are allowed.

- [ ] **Step 5: Replace verification checklist**

Require `node scripts/validate-theme-preview.mjs <output-file>` after generation. Retain a source-color recheck only for `source` and `inferred` tokens; exempt explicitly declared `chrome` tokens. Require every visible `data-contract-id` to exist in the JSON contract.

- [ ] **Step 6: Review for contradictory old rules**

Run: `rg -n 'theme-preview\.html|Every hex|two signals|fallback|chrome|theme-contract|source-only' skills/theme-preview/SKILL.md`

Expected: the new naming, evidence tiers, contract, and source-only downgrade language are all present; no unconditional fixed output filename remains.

- [ ] **Step 7: Commit**

```bash
git add skills/theme-preview/SKILL.md
git commit -m "feat: define theme preview prototype contract workflow"
```

### Task 5: Add a dependency-free contract validator with tests

**Files:**
- Create: `scripts/validate-theme-preview.mjs`
- Create: `tests/validate-theme-preview.test.mjs`

- [ ] **Step 1: Write failing validator tests**

Create a test file using Node's built-ins. It must create temporary HTML fixtures and assert the CLI exit code:

```js
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

const validator = join(process.cwd(), 'scripts/validate-theme-preview.mjs');
function run(html) {
  const dir = mkdtempSync(join(tmpdir(), 'theme-preview-'));
  const file = join(dir, 'preview.html');
  writeFileSync(file, html);
  return () => execFileSync(process.execPath, [validator, file], { encoding: 'utf8', stdio: 'pipe' });
}

test('accepts matching source component and contract', () => {
  const execute = run('<section data-contract-id="button" data-evidence="source"><span class="evidence-label">已观测</span></section><script id="theme-contract" type="application/json">{"schemaVersion":1,"source":{},"stack":[],"tokens":[],"typography":[],"layout":[],"components":[{"id":"button","provenance":"source","evidence":["dom:.btn"]}],"specimens":[],"limitations":[],"generatedAt":"2026-09-07T00:00:00.000Z"}</script>');
  assert.doesNotThrow(execute);
});

test('rejects an inferred block without a visible inference label', () => {
  const execute = run('<section data-contract-id="picker" data-evidence="inferred"></section><script id="theme-contract" type="application/json">{"schemaVersion":1,"source":{},"stack":[],"tokens":[],"typography":[],"layout":[],"components":[{"id":"picker","provenance":"inferred","evidence":["css:.picker"]}],"specimens":[],"limitations":[],"generatedAt":"2026-09-07T00:00:00.000Z"}</script>');
  assert.throws(execute);
});
```

- [ ] **Step 2: Run the tests and confirm failure**

Run: `node --test tests/validate-theme-preview.test.mjs`

Expected: FAIL because `scripts/validate-theme-preview.mjs` does not exist.

- [ ] **Step 3: Implement the validator**

Implement the CLI with these exact rules:

```text
Usage: node scripts/validate-theme-preview.mjs <file>
Exit 2: missing argument or unreadable file.
Exit 1: any validation failure, one "ERROR: ..." per line.
Exit 0: print "VALID: <file>".
```

The validator must: reject `<script src=`, `<link href=`, `href=`, unresolved `<SOURCE_`/`<PRIMARY_`/`#SRC` placeholders; parse exactly one `script#theme-contract[type="application/json"]`; require `schemaVersion === 1`; validate the top-level arrays from Task 1; ensure IDs are unique across `tokens`, `typography`, `layout`, `components`, and `specimens`; ensure records use an allowed provenance and a nonempty evidence array; ensure every `data-contract-id` exists; ensure a block's `data-evidence` equals its contract provenance; require visible Chinese labels for `inferred` and `fallback`; and reject a visible `chrome` block that contains the words `产品主题`.

Use regular expressions for static HTML attributes and `JSON.parse` for the contract; this validator is intentionally dependency-free and does not need a DOM parser.

- [ ] **Step 4: Extend tests for self-containment and bad IDs**

Add one test with `<link href="https://example.test/theme.css">` and assert failure. Add one test with `data-contract-id="missing"` and assert failure.

- [ ] **Step 5: Run the full test suite**

Run: `node --test tests/validate-theme-preview.test.mjs`

Expected: all four tests pass.

- [ ] **Step 6: Validate a minimal real fixture**

Create a temporary valid file using the first test fixture and run:

```bash
node scripts/validate-theme-preview.mjs /tmp/theme-preview-valid.html
```

Expected: `VALID: /tmp/theme-preview-valid.html`.

- [ ] **Step 7: Commit**

```bash
git add scripts/validate-theme-preview.mjs tests/validate-theme-preview.test.mjs
git commit -m "test: validate embedded theme preview contracts"
```

### Task 6: Final regression and skill-level review

**Files:**
- Verify: `skills/theme-preview/SKILL.md`
- Verify: `skills/theme-preview/references/*.md`
- Verify: `skills/theme-preview/references/showcase-skeleton.html`
- Verify: `scripts/validate-theme-preview.mjs`
- Verify: `tests/validate-theme-preview.test.mjs`

- [ ] **Step 1: Run automated validation tests**

Run: `node --test tests/validate-theme-preview.test.mjs`

Expected: PASS with four tests.

- [ ] **Step 2: Run documentation consistency checks**

Run: `rg -n 'theme-contract|data-contract-id|source|inferred|fallback|chrome' skills/theme-preview/SKILL.md skills/theme-preview/references`

Expected: the skill and every relevant reference use the same four provenance values.

- [ ] **Step 3: Ensure generated-output examples are not modified**

Run: `git diff --name-only HEAD~5..HEAD`

Expected: only the skill, references, validator, tests, and plan/spec documentation changed; `boss-ux-maestro-theme-preview.html` and `ip-emr-theme-preview.html` remain untouched.

- [ ] **Step 4: Inspect final status**

Run: `git status --short`

Expected: no tracked implementation files are uncommitted. The local `.superpowers/` browser-session directory may remain untracked and must not be committed.

