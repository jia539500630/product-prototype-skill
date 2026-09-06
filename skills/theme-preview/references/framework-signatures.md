# Framework & Component Signatures

Use this reference only to decide whether the current source *proves* a UI framework or component. A signature is evidence only when it is observed in the actual CSS/HTML/JS/DOM of the current product. Never use these tables as the product's theme.

## Framework detection

| Likely framework | Confirm with source signatures | Style implication for the showcase |
| --- | --- | --- |
| Element UI / Element Plus (Vue) | CSS `.el-*`, `theme-chalk`; CSS vars `--el-color-*`; bundle/JS names `ElButton`, `el-button`, `ElMessage` | Element-like spacing: small radius, compact heights, `.el-*` class vocabulary |
| Ant Design (React) | CSS `.ant-btn`, `.ant-input`, `.ant-table`, `.ant-modal`; JS `Button`, `Modal`, `theme` tokens | Ant-like shapes: 2px–6px radius, density from observed CSS |
| Material-UI / MUI (React) | CSS `.MuiButton`, `.MuiPaper`, `.MuiAppBar`; JS `createMuiTheme`, `createTheme`, `ThemeProvider`, `MuiThemeProvider`; runtime `<style data-jss>` | Material-like tokens: 4–8px radius, uppercase buttons, `palette.primary/secondary`, `elevation` |
| Vuetify (Vue) | CSS `.v-btn`, `.v-app`, `.v-card`; `v-app`, `$vuetify` in JS | Vuetify conventions from observed `.v-*` rules |
| Bootstrap | CSS `.btn`, `.form-control`, `.table`, `.modal`; vars `--bs-*` | Bootstrap default spacing and component classes |
| Tailwind | Utility classes (`bg-*`, `px-*`, `rounded-*`) with no semantic framework prefix | No component library tokens; extract theme from CSS vars/config or computed styles only |
| Custom / legacy | `:root` CSS variables, SCSS `:export` tokens, hashed/unknown class names | Build from explicit tokens first; treat class names as low-confidence component evidence |

If multiple frameworks appear (e.g. custom CSS plus one library), show what is actually used on the analyzed route and do not claim unused libraries.

## Component evidence mapping

Look for these markers in rendered DOM, HTML, CSS selectors, or JS component names. Framework prefix names are examples; record whichever class prefix the source really uses.

| Component category | CSS/class examples | DOM hints | JS/bundle hints |
| --- | --- | --- | --- |
| Button | `.el-button`, `.ant-btn`, `.MuiButton`, `.btn` | `<button>`, `<a role="button">` | `button`, `Button` |
| Text input | `.el-input`, `.ant-input`, `.MuiInput`, `.MuiTextField` | `<input>`, `<textarea>` | `input`, `TextField` |
| Select | `.el-select`, `.ant-select`, `.MuiSelect` | `<select>` or listbox role | `select`, `Select` |
| Radio / checkbox | `.el-radio`, `.ant-radio`, `.MuiRadio`, `.el-checkbox`, `.ant-checkbox`, `.MuiCheckbox` | `type="radio"`, `type="checkbox"` | `Radio`, `Checkbox` |
| Switch | `.el-switch`, `.ant-switch`, `.MuiSwitch` | toggle button / `role="switch"` | `Switch` |
| Table / tree table | `.el-table`, `.ant-table`, `.MuiTable`; tree nodes with indent/connectors | `<table>`, grid role, nested list | `Table`, `columns` |
| Tag / badge / chip | `.el-tag`, `.ant-tag`, `.MuiChip`, `.MuiBadge` | small status text/counters | `Tag`, `Badge`, `Chip` |
| Alert / message | `.el-alert`, `.ant-alert`, `.MuiAlert`, `.el-message` | dismissible status panels | `Alert`, `message`, `snackbar` |
| Dialog / modal | `.el-dialog`, `.ant-modal`, `.MuiDialog` | `role="dialog"`, overlay | `Dialog`, `Modal` |
| Tabs | `.el-tabs`, `.ant-tabs`, `.MuiTabs` | tablist / tab roles | `Tabs` |
| Progress | `.el-progress`, `.ant-progress`, `.MuiLinearProgress`, `.MuiCircularProgress` | bars with fill width | `Progress`, `LinearProgress` |
| Loading / spinner | `.el-loading`, `.ant-spin`, `.MuiCircularProgress` | spinner elements/animations | `Loading`, `Spin` |
| Pagination | `.el-pagination`, `.ant-pagination`, `.MuiPagination` | page number controls | `Pagination` |
| Breadcrumb | `.el-breadcrumb`, `.ant-breadcrumb`, `.MuiBreadcrumbs` | path-style navigation | `Breadcrumb`, `Breadcrumbs` |
| Card / stat card | `.el-card`, `.ant-card`, `.MuiCard` | repeated label+value boxes | `Card`, `Statistic` |
| Empty state | `.el-empty`, `.ant-empty`, `.Mui*` empty placeholder | empty message with illustration | `Empty` |

## Theme extraction recipes

### From compiled CSS or dist

1. Read `:root` and `:export` blocks first, e.g. `rg -o ':export\{[^}]*\}' <file>` or search `rg -n ':root|--[a-zA-Z]+:'`.
2. Count CSS selector prefixes to identify the framework: `rg -o '\.(el|ant|Mui|v)-?[A-Za-z-]+' css/ | sort | uniq -c | sort -rn`.
3. For semantic roles, prefer named tokens (`primary`, `mainColor`, `textLightColor`) over bare color frequency.
4. If no named tokens exist, extract colors with `rg -o '#[0-9a-fA-F]{3,8}'` and use frequency only as low-confidence evidence.

### From a URL / SPA

1. Fetch `index.html`; list CSS and JS bundles, `<title>`, and visible static content.
2. Grep bundles for theme objects or framework signatures: `createTheme`, `palette`, `MuiThemeProvider`, `el-button`, `ant-btn`, CSS-in-JS strings.
3. Render with headless Chromium when available (e.g. `chrome-headless-shell --dump-dom`) and inspect real classes, text, and injected `<style>` blocks.
4. Treat runtime DOM as the strongest component evidence; label values that come only from bundle strings as source-level evidence.

### Computed-style confirmation (best effort)

When a headless browser is available, verify main colors against actual elements: primary buttons/links, page background, top bar. Record `computed` as the evidence source. If computed values differ from token files, prefer runtime DOM for "what users see" and note both.

## Provenance label format

Use compact labels in generated HTML so output is reviewable:

```html
<!-- evidence: css=dist/chunk.css :export mainColor #673AB7 -->
<!-- evidence: dom=.MuiButton background-color rgb(103, 58, 183) -->
<div data-evidence="fallback">模拟组件，未在产物中确认</div>
```
