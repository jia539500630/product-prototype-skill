> ⚠️ 本文件是 `component-discovery.md` 的中文译本，仅供阅读；skill 运行时以英文原版为准。

# 自主组件发现

`framework-signatures.md` 中的类别表是**命名辅助**，不是白名单。先从结构发现控件，再为它们命名。未知的重复块同样属于展示页的内容。

这里的**组件**指可复用的 UI 块：一个根节点加上稳定的内部形态（插槽、重复子项、状态），并被 CSS/JS 当作一个单元对待。它可以是库控件、包装器，或产品独有的复合块。

## 流水线（按此顺序执行）

### 1. 收集原始结构

优先运行时 DOM。也可使用 CSS 选择器树与 JS 渲染函数。

从 DOM（无头浏览器导出或抓取的 HTML）：

- 遍历带 class、`role` 或 data 属性的元素。跳过既无重复兄弟节点又无专属 CSS 的一次性包装。
- 为每个候选根节点记录：标签、类名 token、`role`/`aria-*`、直接子级形态（有序的标签 + 类名）、文本样本、计算盒模型（display、padding、radius、border、shadow）。

从 CSS：

```
rg -o '\.[A-Za-z][A-Za-z0-9_-]{2,}' <artifact-root> -g '*.css' | sort | uniq -c | sort -rn | head -120
```

按**根前缀**分组：共享 `foo-` / `foo__` / `Foo-` 前缀的类名 token（BEM、Element 的 `el-dialog__header`、MUI 的 `MuiDialog-paper`、产品的 `biz-filter-bar`）。一个前缀若有 **3 条以上相关选择器**，即使名称未知也是候选。

从 JS 包中：

- `Vue.component(`、`components: {`、`defineComponent`、`React.createElement`、`forwardRef`、`styled(`、`makeStyles`。
- 与 `render` / `template` 相邻、且能匹配某个 CSS 根节点的 PascalCase 标识符。

### 2. 判定"这是一个组件"

升级前先为候选项打分：

| 信号 | 分值 |
| --- | --- |
| 运行时 DOM 重复、稳定插槽、地标角色或浮层结构 | 2 |
| 带布局与状态选择器的专属 CSS 子树 | 1 |
| 匹配的已导出/已注册 JS 组件符号 | 1 |

得分 **≥ 3** 时才升级，且前提是至少存在一个结构性信号。有 DOM 支撑的候选为 `source`；仅有 CSS 和/或 JS 支撑的候选为 `inferred`。孤立的框架特征既不算组件，也不算组件候选。纯 CSS/JS 组件必须暴露一个根节点，外加至少一个子节点、插槽或状态，才能被演示。

**不要**求必须命中组件库对照表。一个带工具栏 + 筛选片 + 重置按钮的 `filter-panel` 就是组件。

降级（不作为组件演示）：无 CSS 模块的一次性页面外壳（如全站唯一的页脚版权信息）、纯工具类（`flex`、`mt-2`）、裸文本节点。

### 3. 推导可用的名称（可选映射）

1. 若库前缀命中 `framework-signatures.md`，使用该类别名，**并保留**观测到的本地名称（`el-dialog` 与产品的 `ConfirmLeave` 同时保留）。
2. 否则用根类名或 JS 符号命名：`OrgTree`、`FilterBar`、`PatientHeader`。
3. 否则按结构而非猜测命名："固定浮层 + header/body/footer" → 类 Dialog；"嵌套缩进 + 展开控件" → 类 Tree；"标签/值网格" → 类 Descriptions；"等分水平段 + 当前序号" → 类 Steps；"双列表 + 穿梭按钮" → 类 Transfer。
4. 若结构无法干净地映射，以**观测到的类名**作为该区块标题，并展示重建的子树。绝不因无法命名而丢弃它。

### 4. 捕获实例（每个被发现的块都要做）

为每个升级的组件保存：

- **根** 类名 / 角色
- **插槽**：有序的内部区域及其对齐方式（flex、grid、绝对定位的关闭按钮）
- **重复子项** 模板（一个节点/行/标签页），包括图标与尾部操作
- **Token**：来自计算样式或 CSS 的 padding、radius、border、shadow、字体、颜色
- **状态**（CSS/DOM 中实际存在的）：hover、selected、disabled、open、loading、empty
- **证据等级**：`dom` | `css-prefix` | `js-name` | `structure-inferred`

依据这份捕获重建展示页中的演示。不要用现成的组件库样例替代。

### 5. 要覆盖度，不要对照清单

发现完成后，可以（可选地）与组件库对照表*比对*，以察觉缺失的常见控件（例如没找到 Button）。缺失的库控件只能以兜底方式加入。额外发现的控件则是正式的一等成员。

SPA 首屏会隐藏浮层与未访问的路由：仍应升级仅出现在 CSS/JS 中的前缀（`css-prefix` / `js-name` 等级）。只要子树在 CSS 中被完整描述，就不必等待一次点击。

## 结构启发式（示例，不是封闭集合）

用于在聚类之后*命名*。新的形态仍应被捕获。

| 结构模式 | 可能的类别 |
| --- | --- |
| 遮罩 + 居中/固定面板 + 标题 + 操作区 | Dialog / MessageBox |
| 遮罩 + 贴边面板 | Drawer |
| 缩进递增/带层级类名的嵌套项 + 展开箭头 | Tree |
| 带表头行 + 数据行的 `<table>` 或 `role=grid` | Table |
| 等权并列页签 + 一个选中项 + 面板 | Tabs |
| 一行或一列的编号圆点/连线 | Steps |
| 轨道 + 填充内条或环形描边 | Progress |
| 文本旁的小药丸/标签 | Tag / Badge |
| 与控件堆叠或同行的标签 | Form item |
| 重复的带边框区块，含标题 + 正文 | Card |
| `A / B / C` 式路径 | Breadcrumb |
| 页码 + 上一页/下一页 | Pagination |
| 两个列表 + 移动控件 | Transfer |
| 拖放区 + 文件列表 | Upload |
| 垂直节点 + 轴线 | Timeline |
| 侧边链接/条目列表 | Menu / Sider |
| 列表上方的筛选/筛选片/按钮工具条 | Filter bar（产品级） |
| 头部条中的大标题 + 元信息 + 状态 + 操作 | Page / entity header（产品级） |

若某个簇不属于以上任何一类，仍然保留。产品级控件（日历热力图、甘特图行、公式栏）都是有效的。

## 溯源

```html
<!-- discover: root=.filter-bar slots=search+chips+reset repeat=.filter-chip×N grade=dom -->
<!-- infer: kind=FilterBar (structure: toolbar of chips; not in library table) -->
<section data-evidence="dom" data-component="filter-bar">...</section>
```

`structure-inferred` 表示类别是从形态猜测而来；仍要展示真实 DOM 派生出的外观，若类别可能有误，需在可见标签中说明。
