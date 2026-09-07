# Autonomous component discovery

The category table in `framework-signatures.md` is a **labeling aid**, not a whitelist. Discover widgets from structure first, then name them. Unknown repeating blocks still belong in the showcase.

A **component** here means a reusable UI block: a root plus a stable inner shape (slots, repeated children, states) that CSS/JS treats as one unit. It may be a library widget, a wrap, or a product-only composite.

## Pipeline (run in this order)

### 1. Collect raw structure

Prefer runtime DOM. Also use CSS selector trees and JS render functions.

From DOM (headless dump or fetched HTML):

- Walk elements with a class, `role`, or data attribute. Skip one-off wrappers with no repeated siblings and no dedicated CSS.
- Record for each candidate root: tag, class tokens, `role`/`aria-*`, direct child shape (ordered tags + classes), text samples, computed box (display, padding, radius, border, shadow).

From CSS:

```
rg -o '\.[A-Za-z][A-Za-z0-9_-]{2,}' <artifact-root> -g '*.css' | sort | uniq -c | sort -rn | head -120
```

Group by **root prefix**: tokens that share `foo-` / `foo__` / `Foo-` (BEM, Element `el-dialog__header`, MUI `MuiDialog-paper`, product `biz-filter-bar`). A prefix with **3+ related selectors** is a candidate even if the name is unknown.

From JS bundles:

- `Vue.component(`, `components: {`, `defineComponent`, `React.createElement`, `forwardRef`, `styled(`, `makeStyles`.
- PascalCase identifiers next to `render` / `template` that match a CSS root.

### 2. Decide “this is a component”

Score candidates before promotion:

| Signal | Score |
| --- | --- |
| Runtime DOM repetition, stable slots, landmark role, or overlay structure | 2 |
| Dedicated CSS subtree with layout and state selectors | 1 |
| Matching exported/registered JS component symbol | 1 |

Promote at score **>= 3** only when at least one structural signal exists. DOM-backed candidates are `source`; candidates supported only by CSS and/or JS are `inferred`. A lone framework signature is neither a component nor a component candidate. A CSS/JS-only component must expose a root plus at least one child, slot, or state before it can be demoed.

Do **not** require a match in the library table. A `filter-panel` with toolbar + chips + reset is a component.

Demote (do not demo as a component): unique page chrome with no CSS module (one-off footer copyright), utility-only classes (`flex`, `mt-2`), raw text nodes.

### 3. Infer a working name (optional mapping)

1. If a library prefix matches `framework-signatures.md`, use that category **and** keep the observed local name (`el-dialog` vs product `ConfirmLeave`).
2. Else name from the root class or JS symbol: `OrgTree`, `FilterBar`, `PatientHeader`.
3. Else name from structure, not guesswork: “fixed overlay + header/body/footer” → Dialog-like; “nested indent + expand control” → Tree-like; “label/value grid” → Descriptions-like; “horizontal equal segments + current index” → Steps-like; “dual lists + transfer buttons” → Transfer-like.
4. If structure does not map cleanly, title the section with the **observed class** and show the reconstructed subtree. Never drop it for being unnamed.

### 4. Capture the instance (every discovered block)

For each promoted component, store:

- **Root** class / role
- **Slots**: ordered inner regions and how they align (flex, grid, absolute close button)
- **Repeating child** template (one node/row/tab), including icons and trailing actions
- **Tokens**: padding, radius, border, shadow, typography, colors from computed or CSS
- **States** present in CSS/DOM: hover, selected, disabled, open, loading, empty
- **Evidence grade**: `dom` | `css-prefix` | `js-name` | `structure-inferred`

Rebuild the showcase demo from this capture. Do not substitute a stock library mock.

### 5. Coverage, not a checklist

After discovery, optionally *compare* against the library table to notice missing common widgets (no Button found). Missing library widgets are fallback-only. Extra discovered widgets are first-class.

SPA first paint hides overlays and unused routes: still promote CSS/JS-only prefixes (`css-prefix` / `js-name` grade). Do not wait for a click if the subtree is fully described in CSS.

## Structure heuristics (examples, not a closed set)

Use these to *label* after clustering. New shapes should still be captured.

| Structural pattern | Likely kind |
| --- | --- |
| Mask + centered/fixed panel + title + actions | Dialog / MessageBox |
| Mask + panel attached to an edge | Drawer |
| Nested items with increasing padding-left / level class + caret | Tree |
| `<table>` or `role=grid` with header row + body rows | Table |
| Equal peer tabs + one selected + panel | Tabs |
| Numbered circles/lines in a row or column | Steps |
| Track + filled inner bar or circular stroke | Progress |
| Small pill/label next to text | Tag / Badge |
| Label stacked or inline with control | Form item |
| Repeated bordered block with title + body | Card |
| Path `A / B / C` | Breadcrumb |
| Page numbers + prev/next | Pagination |
| Two lists + move controls | Transfer |
| Drop zone + file list | Upload |
| Vertical nodes + axis line | Timeline |
| Sidebar list of links/items | Menu / Sider |
| Toolbar of filters/chips/buttons above a list | Filter bar (product) |
| Large title + meta + status + actions in a header strip | Page / entity header (product) |

If a cluster matches none of these, keep it. Product widgets (calendar heatmaps, Gantt rows, formula bars) are valid.

## Provenance

```html
<!-- discover: root=.filter-bar slots=search+chips+reset repeat=.filter-chip×N grade=dom -->
<!-- infer: kind=FilterBar (structure: toolbar of chips; not in library table) -->
<section data-evidence="dom" data-component="filter-bar">...</section>
```

`structure-inferred` means the kind is a guess from shape; still show the real DOM-derived chrome, and say so in the visible label if the kind might be wrong.
