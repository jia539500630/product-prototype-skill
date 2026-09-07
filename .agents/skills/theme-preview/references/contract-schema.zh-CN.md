> ⚠️ 本文件是 `contract-schema.md` 的中文译本，仅供阅读；skill 运行时以英文原版为准。

# 内嵌原型契约

每个生成的预览都内嵌一份不参与渲染的契约：

```html
<script id="theme-contract" type="application/json">
{"schemaVersion":1,"source":{"kind":"url","value":"https://example.test/app","route":"/app"},"stack":[{"name":"Material-UI","evidence":["dom:.MuiButton"]}],"tokens":[{"id":"color-primary","name":"primary","value":"#673AB7","kind":"color","provenance":"source","evidence":["token:theme.palette.primary.main"]}],"typography":[],"layout":[],"components":[{"id":"mui-button","name":"Button","root":".MuiButton-root","provenance":"source","evidence":["dom:.MuiButton-root"],"slots":["label"],"states":["contained"]}],"specimens":[{"id":"dashboard-header","name":"Dashboard header","componentIds":["mui-button"],"provenance":"inferred","evidence":["css:.dashboard-header"]}],"limitations":["No runtime route traversal was performed."],"generatedAt":"2026-09-07T00:00:00.000Z"}
</script>
```

`provenance` 的取值精确限定为 `source`、`inferred`、`fallback` 或 `chrome` 之一。`tokens`、`typography`、`layout`、`components` 和 `specimens` 中的每条记录，都必须具有唯一的 `id`、一个 provenance 值和非空的 `evidence`。Chrome（文档外壳）是文档自身的样式，绝不能被描述为产品 token。

可见区块通过如下方式关联到契约记录：

```html
<section data-component="mui-button" data-contract-id="mui-button" data-evidence="source"><span class="evidence-label">DOM 已观测</span></section>
<section data-component="date-picker" data-contract-id="date-picker" data-evidence="inferred"><span class="evidence-label">CSS/JS 推断</span></section>
<section data-component="empty-state" data-contract-id="empty-state" data-evidence="fallback"><span class="evidence-label">模拟／未在产物中确认</span></section>
```

`source` 的标签可见地写明 `已观测`；`inferred` 的标签包含 `推断`；fallback 的标签包含 `模拟` 或 `未在产物中确认`。
