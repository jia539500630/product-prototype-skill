# Theme Preview Contract Design

## Goal

Turn a product URL or local build artifact into one standalone static HTML prototype baseline. The page must expose the product's extracted visual language, component inventory, and layout conventions so later prototype work can follow the same constraints.

## Scope

Inputs are one live URL or one local artifact directory. The output remains one `theme-preview.html` file with no external runtime dependencies. It is documentation and a prototype constraint baseline, not a running clone of the source product.

## Evidence model

Every displayed token, component, and layout rule has one provenance value:

- `source`: observed in rendered DOM/computed styles or explicitly declared in source tokens.
- `inferred`: supported by CSS selector clusters or JS component symbols but not observed in the selected runtime DOM.
- `fallback`: included only to make the prototype baseline usable and explicitly labelled as unconfirmed.
- `chrome`: neutral documentation-page styling; it is not claimed to belong to the source product.

`source` evidence has priority over `inferred`; `inferred` has priority over `fallback`. A value may record more than one evidence record, but its visible provenance is the strongest available one.

## Extraction pipeline

1. Identify the source product, active route where applicable, and any framework signatures.
2. Gather DOM structure and computed styles when available; gather explicit CSS/JS theme tokens in all cases.
3. Cluster CSS selectors and JS symbols into candidate components using root prefixes, slots, repeated children, roles, and state selectors.
4. Promote DOM-backed candidates as `source`; promote CSS/JS-only candidates as `inferred` when their root and internal structure are sufficiently described.
5. Record colors, typography, spacing, radii, borders, shadows, density, component slots, states, and page-level layout patterns with their evidence.

## HTML output

The output uses a single, linear page with no side navigation and these sections in order:

1. Product/source summary and evidence limitations.
2. Theme and typography, including only source-derived product values plus clearly separated chrome values.
3. Observed components.
4. Inferred components.
5. Page-layout specimens assembled from discovered components.
6. Fallback components, only if necessary, followed by provenance notes.

Each component section has `data-component`, `data-evidence`, and a compact source reference. Inferred and fallback entries have visible Chinese labels. A page-layout specimen is labelled `原型组合推断` unless its composition is directly observed in DOM/source markup.

## Embedded contract

The HTML contains one non-rendering block:

```html
<script id="theme-contract" type="application/json">…</script>
```

It is not shown to users. Its schema contains `source`, `stack`, `tokens`, `typography`, `layout`, `components`, `specimens`, `limitations`, and `generatedAt`. Every visible product token/component/specimen references an item in this contract. Contract records contain an `id`, `evidence`, `provenance`, and source location where available.

## Safety and degradation

The extractor does not submit credentials, bypass access control, or claim content from an inaccessible page. If runtime rendering is unavailable, it produces source-only results and says so in both the visible limitations and the contract. Static bundle signatures are never presented as DOM observation.

## Validation

Validation checks that the output is self-contained, contains no external scripts/styles, has no unresolved placeholders, labels inferred/fallback items visibly, uses declared provenance, and keeps visible components/tokens/specimens consistent with the embedded contract. Source color verification excludes `chrome` tokens.

## Out of scope

The skill does not reproduce application behavior, authenticate to protected products, crawl unrelated routes, or generate a multi-page application.
