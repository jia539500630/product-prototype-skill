---
name: theme-preview
description: Use when the user points at a live page URL, a dist/static build folder, or a CSS/JS/HTML artifact and wants a single-file static showcase of that product's real theme and detected components. Triggers include "分析这个URL/产物，生成主题组件预览", "展示该产品的主题和组件", "把页面/产物的主题和常用组件做成一个静态展示页", or "make a theme/component showcase page". Do not use for designing a new product UI; use for inspecting and visualizing an existing product.
---

# Evidence-Based Theme & Component Showcase

Given one product's URL or build artifact, produce one standalone static prototype baseline that extracts reusable theme, component, and layout constraints for later project prototyping.

**Core principle:** never claim a color, component, framework, or business domain is real until the source proves it. Every preview decision must be traceable to an artifact, page markup, runtime DOM, or explicit theme configuration.

## When to Use

Use when the user wants to *see* an existing product's visual identity and UI components as documentation:

- "分析这个URL/产物，生成主题和组件展示页"
- "把这个站点的主题色和实际组件做成一个静态 HTML 原型"
- "make a component showcase from this site/artifact"

Do not use when the user wants to build a new app, redesign from scratch, or produce screenshots of a running product.

## Evidence Rules (read before anything else)

1. **No memory-based colors or components.** Do not reuse a palette, class vocabulary, or sample content from this skill, another product, or previous runs unless the current source shows the same value.
2. **No fixed template output.** `references/showcase-skeleton.html` shows only a neutral page structure and CSS conventions. It is not a final example to copy; its colors, component set, and content are placeholders.
3. **Evidence quality order:**
   - **DOM/computed evidence** (highest): rendered page elements, class names, inline `<style>`, computed colors and layout values.
   - **Explicit source tokens**: CSS custom properties (`:root`), SCSS `:export`, framework theme objects (Material UI `palette`, Ant `theme`, etc.).
   - **Static signatures**: CSS selectors, HTML markup, JS bundle strings, framework/component class prefixes.
   - **Low-confidence heuristics**: color frequency, `theme-color` meta, favicon colors. Use only when labeled low-confidence, never as the primary palette.
4. Anything built without real evidence must be marked **fallback**. Use `data-evidence="fallback"` on those sections and say "模拟/未在产物中确认" in the visible label. Never present fallback styling as the product's real style.
5. The output stays one self-contained static HTML file. No framework, build step, or real interactivity.

## Prototype Contract

Read `references/contract-schema.md`. Every extracted item is `source` (DOM/computed or explicit token), `inferred` (CSS/JS-supported but not runtime-observed), `fallback` (needed for baseline completeness), or `chrome` (neutral documentation shell). Render inferred components in their own section with a visible `推断` label; never call them observed. Embed the contract in `script#theme-contract[type="application/json"]`, but do not render its JSON.

## Workflow

### 1. Inspect the input

- **URL**: fetch the HTML first. Read `<title>`, meta, loaded CSS/JS assets. If the page is a JS-rendered SPA and a headless browser is available, render it and dump the resulting DOM/computed styles. If rendering fails or is blocked, degrade to source-only analysis and say so in the footer.
- **dist / static folder**: locate compiled CSS (`*.css`, `theme-chalk`, Vite/Webpack bundles), HTML templates, and JS chunks. Prefer files that declare theme variables, `:export` tokens, or framework theme objects.
- If no source can be reached, do not block: tell the user the preview will be based only on available/known values, and mark missing evidence.

### 2. Identify the product and framework

- Product name and business domain: derive from `<title>`, page headings, menu items, labels, and visible copy. Do not guess a domain if the source is ambiguous.
- UI framework/component library: compare CSS prefixes, class names, and JS strings against `references/framework-signatures.md`. Record which signature and file proved the match.

### 3. Extract the theme

- Collect only values found in the current source, in the evidence-quality order above.
- Map colors to semantic roles where the source names them (`primary`, `secondary`, `danger`, `pageBg`, `textLightColor`, etc.). Do not rename or invent semantic meanings.
- Also record layout conventions when discoverable: radius, font family, input height, padding, border, shadow, page background.
- If a common role has no evidence (e.g. no warning color found), omit it or show it under "未找到证据" rather than choosing a color.

### 4. Discover components (structure first)

Do **not** start from a fixed list (Button, Dialog, Tree, …). Discover reusable blocks from DOM/CSS/JS, then optionally map them to a known kind. Two products on the same library will yield different inventories and different inner layouts; unknown product widgets still belong in the showcase.

Follow `references/component-discovery.md` in full. Summary:

**4a. Cluster**

- Runtime DOM: repeated isomorphic subtrees, slot-shaped children (header/body/footer, list/item, label/control), landmark roles, overlay+panel.
- CSS: group selectors by shared root prefix (BEM / `el-dialog__*` / product `foo-bar`). A prefix with 3+ related rules or hover/selected states is a candidate.
- JS: registered/exported symbols that match a CSS or DOM root.
- SPA first paint is incomplete — still take CSS/JS-only prefixes.

**4b. Promote when ≥2 signals fire** (repeat, slots, dedicated CSS, role, overlay, JS name). Skip utility classes and one-off page chrome.

**4c. Name**

- Library table match → use that kind, keep the local class/symbol.
- Else use the observed class or JS name.
- Else a structure label (“overlay + header/body/footer”, “nested indent + caret”). Never drop a cluster because it is not in the table.

**4d. Capture and rebuild**

For every promoted block record root, slot order/alignment, repeating child template, tokens, states, evidence grade (`dom` / `css-prefix` / `js-name` / `structure-inferred`). Rebuild the demo from that capture — not from a stock library mock or the skeleton’s placeholder widgets.

**4e. Copy and fallbacks**

- Library widgets that never appeared may be added only as `data-evidence="fallback"`.
- Sample copy comes from the page/artifact. If none, use 用户/任务/团队/数据/设置. Never default a business domain.

### 5. Generate the showcase

- Build one static HTML using the neutral layout from `references/showcase-skeleton.html`, replacing every placeholder with extracted evidence values.
- Palette and component sections must carry provenance for review. Add an HTML comment such as `<!-- evidence: css:primary-main=#673AB7 -->` or `data-evidence` attributes.
- The page must not claim a framework, component, or palette it did not detect. The footer states: source URL/path, detected stack, primary/main color, and any fallback/missing evidence.

### 6. Verify before finishing

- Every source/inferred hex or gradient shown appears in collected evidence; explicit `chrome` tokens are exempt.
- No leftover text, colors, or component names from previous examples appear in the output.
- The HTML opens standalone and renders without network dependencies (the optional Element-UI link from the old template must not be copied).
- Use a linear page with no sidebar: summary, theme/typography, observed components, inferred components, layout specimens, optional fallbacks, limitations. A composition not directly observed visibly says `原型组合推断`.
- Do not submit credentials, bypass access control, or traverse unrelated routes. If rendering is unavailable, record the source-only limitation in the contract and footer.

## Output

- Write to `theme-preview-<sanitized-product>.html` in the current repo root unless the user gives another filename. If it exists, append `-<YYYYMMDD-HHmmss>`; never overwrite silently.
- Header subtitle names the real product and detected framework, e.g. "基于 <source> 分析 · React + Material-UI".
- `lang` follows the user's language, defaulting to `zh-CN` when ambiguous.

## Common Mistakes

- Copying `references/showcase-skeleton.html`, old IP-EMR output, or any remembered palette as the final artifact.
- Styling the preview like Element-UI for a product that is Material UI, Ant Design, or custom.
- Inventing semantic color names (`mainColorDeep`) not present in the source.
- Using fixed business copy (医疗/电商/后台) for every product.
- Leaving hardcoded colors outside `:root` CSS variables.
- Claiming a component exists when only a framework signature or a generic fallback was used.
- Starting from the library category table and only demoing rows that match it.
- Dropping a repeating DOM/CSS cluster because it has no standard name (filter bar, entity header, Gantt row, …).
- Rebuilding a discovered block as a stock library widget instead of the captured slots/tokens.
- Analyzing only the first URL dump and ignoring prefixes that appear only in CSS/JS chunks.

## Red Flags — Stop and Re-check Evidence

- "这个主题应该是 X" without a file/DOM match.
- Reusing the previous product's palette because it "looks similar".
- Copying the full old `template.html` content into the new output.
- Marking fallback demos as "已确认".
