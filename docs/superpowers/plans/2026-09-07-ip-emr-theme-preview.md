# IP EMR Theme Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a standalone evidence-based theme and component showcase for the IP EMR static build artifact.

**Architecture:** The preview is one self-contained HTML document with CSS variables copied only from explicit `:export` theme tokens and HTML specimens reconstructed from CSS/JS component structures. It embeds a JSON contract that records source paths, provenance, evidence, composition graph, and source-only limitations.

**Tech Stack:** Static HTML, inline CSS, inline JSON contract, shell-based artifact inspection.

---

### Task 1: Create the Evidence-Based Preview

**Files:**
- Create: `theme-preview-ip-emr-frontend-20260907-*.html`
- Reference: `/Users/li/byway/ip-emr-frontend/dist/index.html`
- Reference: `/Users/li/byway/ip-emr-frontend/dist/css/theme-colors-5cd74d38.css`
- Reference: `/Users/li/byway/ip-emr-frontend/dist/js/chunk-22dc9d24.6b2d53cc.js`

- [ ] **Step 1: Write a failing structural check**

```sh
test -f theme-preview-ip-emr-frontend-20260907-*.html
```

Expected: failure because the timestamped preview does not exist.

- [ ] **Step 2: Add the preview**

Create one offline HTML file with:

```html
<script id="theme-contract" type="application/json">{"schemaVersion":1}</script>
```

It must include source tokens such as `mainColor: #079c66`, discovered Element Plus and vxe-table component families, inferred IP EMR composites, and source-only limitations.

- [ ] **Step 3: Run structural and provenance checks**

```sh
rg -n 'theme-contract|#079c66|Element Plus|vxe-table|源代码/样式推断' theme-preview-ip-emr-frontend-20260907-*.html
```

Expected: every required marker appears in the generated file.

- [ ] **Step 4: Validate standalone HTML**

```sh
node -e "const fs=require('fs'); const p=process.argv[1]; const s=fs.readFileSync(p,'utf8'); if (!s.includes('<!doctype html>') || !s.includes('id=\"theme-contract\"')) process.exit(1)" theme-preview-ip-emr-frontend-20260907-*.html
```

Expected: exit code 0.

### Task 2: Verify Evidence Discipline

**Files:**
- Modify: `theme-preview-ip-emr-frontend-20260907-*.html`

- [ ] **Step 1: Check token provenance**

```sh
rg -n '#079c66|#a2d1cc|#f8f8f8|#ebfff8|#005226|#fe5353|#ffa000' theme-preview-ip-emr-frontend-20260907-*.html
```

Expected: all displayed product colors appear in source-token evidence comments or contract records.

- [ ] **Step 2: Check provenance labels**

```sh
rg -n '已观测|推断|模拟/未在产物中确认|源代码/样式推断' theme-preview-ip-emr-frontend-20260907-*.html
```

Expected: inferred material is visibly labeled and source-only limitations are stated.
