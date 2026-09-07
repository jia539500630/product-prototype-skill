# System composition inference

Framework detection is supporting evidence, never the inventory. Build a product-specific composition graph before rendering the showcase.

## Four levels

1. **Application shell** — global header, side navigation, workspace, route tabs, footer, overlay layer.
2. **Page patterns** — list/search, detail, edit/form, dashboard, workflow, modal/drawer. Infer only from repeated DOM/CSS/route chunk structure.
3. **Composite components** — filter bar, entity header, data workspace, master-detail pane, toolbar, timeline, card group.
4. **Primitives** — controls, tags, table cells, feedback, pagination, picker, dialog.

For every promoted item capture its parent/child links. A page specimen may combine items only when its relationship is observed, or is labelled `原型组合推断`.

## Evidence and coverage

Create a graph record for each level with `id`, `kind`, `children`, `provenance`, and `evidence`. Inspect all compiled CSS and route chunks, not merely the entry stylesheet. CSS root families, route chunk names, repeated selector subtrees, and JS registrations may establish `inferred` composition. Do not turn a framework's complete catalog into a product inventory.

The preview must show a coverage summary: observed/inferred shells, page patterns, composites, and primitives. If a level has no evidence, say `未找到证据`; do not fill it from a library template.
