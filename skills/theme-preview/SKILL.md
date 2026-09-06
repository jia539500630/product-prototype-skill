---
name: theme-preview
description: Use when the user asks to generate a theme-style and component-example HTML prototype from a build artifact, dist folder, CSS bundle, or URL — producing an Element-UI-style component documentation page that showcases the product's theme colors and common UI components on a single static HTML file. Triggers on phrases like "分析产物生成主题预览", "生成主题风格和组件示例HTML原型", "像element-ui文档展示组件", or "make a theme/component showcase page".
---

# Theme Preview Generator

Turn an existing product's build artifact (bundled CSS, `dist/`, a URL's CSS) into a self-contained, Element-UI-style **component documentation page**: one static `theme-preview.html` that shows the theme palette and every common component rendered live.

## When to Use

Use when the user wants to *see* a product's visual identity and components, not to build a real app:

- "分析产物/url地址，生成主题风格和组件示例HTML原型"
- "把改产物的主题和常用组件展示出来在一个静态HTML上"
- "类似element-ui组件文档展示效果"

A concrete working example lives at `references/template.html` — read it before starting.

## Goal

**Produce one static HTML file** (no build step, no framework) that:

1. Documents the **theme**: extracted color palette, typography, status colors, gradients.
2. Renders a **component gallery**: buttons, forms, tables, tags, dialogs, tabs, progress, loading, stat cards, pagination, breadcrumb, empty state, and the rest — matching the real product's styling conventions.
3. Looks like an **Element-UI component docs page**: sections, cards, `section-title` headers, code-reviewable inline CSS.

## Workflow

### 1. Locate the source of truth

- **Build artifact / dist folder**: find the compiled CSS (e.g. `*/app.*.css`, `theme-chalk`, or a Vite/Webpack bundle). Prefer the real CSS over memory.
- **URL**: if unreachable (offline/sandboxed), tell the user you'll base the preview on the given/known theme values, and proceed with what's available rather than blocking.

### 2. Extract the theme

Read the CSS and record, at minimum:

- **Main color** + deep variant + light background + gradient (e.g. `#079c66`, `#005226`, `#ebfff8`, `#fafefd→#e5f9f6`).
- **Functional colors**: red/green/blue/yellow/orange/purple and their light "bg" variants.
- **Border / hover / table border / shadow / page-bg** and **text color scale** (primary, secondary `#666`, label `#999`).
- **Radius, font family, input heights, padding** conventions.

Organize these into CSS custom properties under `:root` in the output.

### 3. Build the theme section

Show the palette as swatches:
- A `color-palette` grid of swatches with the color block, a semantic `name`, and its `hex`.
- Group into "主色调" (core palette incl. gradients) vs "功能色" (functional/status colors).

### 4. Build the component gallery

Render each common component as a demo with real theme tokens, matching Element-UI conventions. Include at least:

- **文字与状态** — text color scale + status dots (success/danger/warning/info).
- **按钮** — primary, deep, outline, shadow, functional (delete/confirm/detail/warning/cancel/disabled).
- **表单** — inputs, selects, textarea, addon input, required marks, disabled state, date.
- **单选/多选** — radio circles & checkbox squares using the main color.
- **标签与徽章** — Tag (per status color) and Badge.
- **表格** — Element-style table with themed gradient header, striped borders, hover row; plus a **tree/branch** variant (parent → children with connector lines).
- **提示反馈** — Alert info/success/warning/error.
- **对话框** — basic and warning dialog demos (static mock, not functional).
- **选项卡/进度条/加载状态/数据卡片/分页/面包屑/分割线/空状态** — matching the example.

Use domain-realistic sample content relevant to the product (e.g. medical: 医嘱/药品/患者), like the example does.

### 5. Style conventions

- Inline `<style>` block; define everything as CSS custom properties referenced everywhere.
- Reuse the example's class vocabulary: `.section`, `.section-title`, `.card`, `.color-swatch`, `.btn-group`, `.form-*`, `.tag-*`, `.alert-*`, `.demo-table`, `.pagination`, `.breadcrumb`, etc. — keep names consistent so the output reads like Element-UI docs.
- Self-contained: no framework dependency. You **may** optionally link `element-ui`'s theme-chalk CSS, but the demo styling must come from the extracted theme so it renders offline.

### 6. Footer + attribution

End with a footer noting the source ("基于 `<产物/url>` CSS 分析生成") and the discovered main theme color.

## Output

- Write to `theme-preview.html` in the repo root (match the example filename) unless the user asks otherwise.
- Header subtitle should name the real product/framework of the analyzed artifact.
- Keep `lang="zh-CN"`, UTF-8, responsive single page.

## Common Mistakes

- Inventing colors the artifact doesn't have — extract from source, and if a value genuinely can't be found, mark it clearly.
- Blocking a URL-only request on network access — proceed from known/given values instead.
- Adding real JS interactivity or building a multi-file app — this is a **static showcase**, not a product feature.
- Leaving hardcoded colors scattered instead of centralized `:root` variables.
