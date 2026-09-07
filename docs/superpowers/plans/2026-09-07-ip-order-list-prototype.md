# IP 订单列表静态原型 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个离线可打开、体现已提取 IP 订单系统视觉契约的订单列表工作台原型。

**Architecture:** 以单一 `HTML` 文件承载语义化页面结构、模拟订单数据、内嵌 CSS 和少量本地交互。Node 内置测试仅检查离线依赖、关键页面区域和主题令牌，避免引入第三方构建工具。

**Tech Stack:** HTML5、CSS3、原生 JavaScript、Node.js `node:test`。

---

## File Structure

- Create: `prototypes/ip-order-list.html` — 可双击打开的视觉原型和局部交互。
- Create: `tests/ip-order-list-prototype.test.mjs` — 对原型的离线性、结构和主题令牌做静态校验。

### Task 1: 建立原型契约测试

**Files:**
- Create: `tests/ip-order-list-prototype.test.mjs`

- [ ] **Step 1: 写入失败测试**

```js
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const prototypePath = new URL('../prototypes/ip-order-list.html', import.meta.url);

test('order-list prototype is self-contained and exposes the required workbench regions', async () => {
  const html = await readFile(prototypePath, 'utf8');
  assert.match(html, /--primary:\s*#079c66/i);
  assert.match(html, /class="sidebar"/);
  assert.match(html, /class="filter-panel"/);
  assert.match(html, /class="order-table"/);
  assert.match(html, /class="pagination"/);
  assert.doesNotMatch(html, /https?:\/\//);
});
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `node --test tests/ip-order-list-prototype.test.mjs`

Expected: FAIL，原因是 `prototypes/ip-order-list.html` 尚不存在。

- [ ] **Step 3: 提交测试**

```bash
git add tests/ip-order-list-prototype.test.mjs
git commit -m "test: define order list prototype contract"
```

### Task 2: 实现离线订单列表工作台

**Files:**
- Create: `prototypes/ip-order-list.html`

- [ ] **Step 1: 新建带主题令牌的 HTML 壳**

```html
<main class="app-shell">
  <aside class="sidebar" aria-label="主导航"></aside>
  <section class="workspace">
    <section class="filter-panel" aria-label="订单筛选"></section>
    <section class="order-table" aria-label="订单列表"></section>
    <nav class="pagination" aria-label="订单分页"></nav>
  </section>
</main>
```

- [ ] **Step 2: 补齐视觉与信息层级**

在根选择器声明 `--primary: #079c66`、浅绿、深绿、边框、文本、字号和圆角令牌。实现顶部工作栏、绿色状态标签、32px 查询控件、渐变表头、8 条去标识化模拟订单、行悬停和当前行样式。

- [ ] **Step 3: 加入无网络依赖的局部交互**

为导航、状态筛选、查询、重置、行选择和分页按钮提供前端视觉反馈；不发送请求、不保存数据。

- [ ] **Step 4: 运行契约测试并确认通过**

Run: `node --test tests/ip-order-list-prototype.test.mjs`

Expected: PASS，且输出 1 个通过的子测试。

- [ ] **Step 5: 手工浏览器检查**

Run: `open prototypes/ip-order-list.html`

Expected: 1280px 以上视口显示完整工作台；无横向页面溢出；查询区、表头、状态标签和分页清晰可辨。

- [ ] **Step 6: 提交实现**

```bash
git add prototypes/ip-order-list.html tests/ip-order-list-prototype.test.mjs
git commit -m "feat: add IP order list static prototype"
```

## Self-Review

- 规格中的顶部栏、侧栏、标题和操作区、查询区、订单表、状态标签与分页均在任务 2 覆盖。
- 原型不含外部 URL、源系统标识、专有图标、真实患者信息或接口调用；任务 1 的离线检查覆盖外部 URL。
- 使用的 `sidebar`、`filter-panel`、`order-table`、`pagination` 类名与任务 1 测试完全一致。
