# Embedded prototype contract

Every generated preview embeds one non-rendering contract:

```html
<script id="theme-contract" type="application/json">
{"schemaVersion":1,"source":{"kind":"url","value":"https://example.test/app","route":"/app"},"stack":[{"name":"Material-UI","evidence":["dom:.MuiButton"]}],"tokens":[{"id":"color-primary","name":"primary","value":"#673AB7","kind":"color","provenance":"source","evidence":["token:theme.palette.primary.main"]}],"typography":[],"layout":[],"components":[{"id":"mui-button","name":"Button","root":".MuiButton-root","provenance":"source","evidence":["dom:.MuiButton-root"],"slots":["label"],"states":["contained"]}],"specimens":[{"id":"dashboard-header","name":"Dashboard header","componentIds":["mui-button"],"provenance":"inferred","evidence":["css:.dashboard-header"]}],"limitations":["No runtime route traversal was performed."],"generatedAt":"2026-09-07T00:00:00.000Z"}
</script>
```

`provenance` is exactly `source`, `inferred`, `fallback`, or `chrome`. Every record in `tokens`, `typography`, `layout`, `components`, and `specimens` has a unique `id`, a provenance value, and nonempty `evidence`. Chrome is documentation styling and must never be described as a product token.

Visible blocks link to a contract record:

```html
<section data-component="mui-button" data-contract-id="mui-button" data-evidence="source"><span class="evidence-label">DOM 已观测</span></section>
<section data-component="date-picker" data-contract-id="date-picker" data-evidence="inferred"><span class="evidence-label">CSS/JS 推断</span></section>
<section data-component="empty-state" data-contract-id="empty-state" data-evidence="fallback"><span class="evidence-label">模拟／未在产物中确认</span></section>
```

`source` labels visibly say `已观测`; `inferred` labels include `推断`; fallback labels include `模拟` or `未在产物中确认`.
