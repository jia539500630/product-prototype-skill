> ⚠️ 本文件是 `framework-signatures.md` 的中文译本，仅供阅读；skill 运行时以英文原版为准。

# 框架与组件特征签名

仅使用本参考文档判断当前来源是否*证明*了某个 UI 框架或组件。特征只有在当前产品的实际 CSS/HTML/JS/DOM 中被观测到时才算证据。绝不能把这些表格当作产品的主题来使用。

## 框架检测

| 可能的框架 | 以源码特征确认 | 对展示页的样式含义 |
| --- | --- | --- |
| Element UI / Element Plus（Vue） | CSS `.el-*`、`theme-chalk`；CSS 变量 `--el-color-*`；bundle/JS 中的名称 `ElButton`、`el-button`、`ElMessage` | Element 式间距：小圆角、紧凑高度、`.el-*` 类名词汇 |
| Ant Design（React） | CSS `.ant-btn`、`.ant-input`、`.ant-table`、`.ant-modal`；JS `Button`、`Modal`、`theme` token | Ant 式形态：2px–6px 圆角，密度以观测到的 CSS 为准 |
| Material-UI / MUI（React） | CSS `.MuiButton`、`.MuiPaper`、`.MuiAppBar`；JS `createMuiTheme`、`createTheme`、`ThemeProvider`、`MuiThemeProvider`；运行时 `<style data-jss>` | Material 式 token：4–8px 圆角、大写按钮、`palette.primary/secondary`、`elevation` |
| Vuetify（Vue） | CSS `.v-btn`、`.v-app`、`.v-card`；JS 中的 `v-app`、`$vuetify` | 以观测到的 `.v-*` 规则体现 Vuetify 约定 |
| Bootstrap | CSS `.btn`、`.form-control`、`.table`、`.modal`；变量 `--bs-*` | Bootstrap 的默认间距与组件类名 |
| Tailwind | 工具类（`bg-*`、`px-*`、`rounded-*`），且无语义化框架前缀 | 无组件库 token；仅从 CSS 变量/配置或计算样式中提取主题 |
| 自研 / 旧式 | `:root` CSS 变量、SCSS `:export` token、哈希化/未知类名 | 优先从显式 token 构建；类名仅作低置信度组件证据 |

若出现多个框架（例如自研 CSS 加一个组件库），只展示被分析路由上实际使用的内容，不要声称用到了未使用的库。包内特征只证明"可用"；路由上的实际使用需要 DOM、路由标记或产品包装器参照来证明。

## 组件证据映射

**发现不是这张表。**先聚类 DOM/CSS/JS（见 `references/component-discovery.md`）。下列各行只用于给已存在的簇*命名*。表之外的形态仍要获得自己的展示区块，并以观测到的根类名命名。

在渲染后的 DOM、HTML、CSS 选择器或 JS 组件名中寻找以下标记。框架前缀名仅为示例；来源中实际使用什么类名前缀，就记录什么。

| 组件类别 | CSS/类名示例 | DOM 线索 | JS/bundle 线索 |
| --- | --- | --- | --- |
| Button 按钮 | `.el-button`、`.ant-btn`、`.MuiButton`、`.btn` | `<button>`、`<a role="button">` | `button`、`Button` |
| 文本输入 | `.el-input`、`.ant-input`、`.MuiInput`、`.MuiTextField` | `<input>`、`<textarea>` | `input`、`TextField` |
| Select 选择器 | `.el-select`、`.ant-select`、`.MuiSelect` | `<select>` 或 listbox 角色 | `select`、`Select` |
| 单选 / 复选 | `.el-radio`、`.ant-radio`、`.MuiRadio`、`.el-checkbox`、`.ant-checkbox`、`.MuiCheckbox` | `type="radio"`、`type="checkbox"` | `Radio`、`Checkbox` |
| Switch 开关 | `.el-switch`、`.ant-switch`、`.MuiSwitch` | 切换按钮 / `role="switch"` | `Switch` |
| 表格 / 树形表格 | `.el-table`、`.ant-table`、`.MuiTable`；带缩进/连接线的树节点 | `<table>`、grid 角色、嵌套列表 | `Table`、`columns` |
| 标签 / 徽标 / Chip | `.el-tag`、`.ant-tag`、`.MuiChip`、`.MuiBadge` | 小型状态文本/计数器 | `Tag`、`Badge`、`Chip` |
| Alert / 全局提示 | `.el-alert`、`.ant-alert`、`.MuiAlert`、`.el-message` | 可关闭的状态面板 | `Alert`、`message`、`snackbar` |
| 对话框 / 模态 | `.el-dialog`、`.ant-modal`、`.MuiDialog` | `role="dialog"`、浮层 | `Dialog`、`Modal` |
| Tabs 标签页 | `.el-tabs`、`.ant-tabs`、`.MuiTabs` | tablist / tab 角色 | `Tabs` |
| Progress 进度 | `.el-progress`、`.ant-progress`、`.MuiLinearProgress`、`.MuiCircularProgress` | 带填充宽度的条 | `Progress`、`LinearProgress` |
| Loading / 加载指示 | `.el-loading`、`.ant-spin`、`.MuiCircularProgress` | 旋转元素/动画 | `Loading`、`Spin` |
| Pagination 分页 | `.el-pagination`、`.ant-pagination`、`.MuiPagination` | 页码控件 | `Pagination` |
| Breadcrumb 面包屑 | `.el-breadcrumb`、`.ant-breadcrumb`、`.MuiBreadcrumbs` | 路径式导航 | `Breadcrumb`、`Breadcrumbs` |
| 卡片 / 统计卡片 | `.el-card`、`.ant-card`、`.MuiCard` | 重复的标签+值区块 | `Card`、`Statistic` |
| 空状态 | `.el-empty`、`.ant-empty`、`.Mui*` 空占位 | 带插图的空状态文案 | `Empty` |
| 树 / 组织树 / 文件树 | `.el-tree`、`.ant-tree`、`.MuiTreeView`、`*-tree`、`*-tree-node` | 嵌套列表、缩进、展开箭头、连接线 | `Tree`、`TreeView`、`OrgTree` |
| Drawer 抽屉 | `.el-drawer`、`.ant-drawer`、`.MuiDrawer` | 侧边面板浮层 | `Drawer` |
| Steps 步骤条 | `.el-steps`、`.ant-steps`、`.MuiStepper` | 编号的水平/垂直步骤 | `Steps`、`Stepper` |
| 日期 / 区间选择器 | `.el-date-picker`、`.ant-picker`、`.MuiDatePicker` | 日历弹层类名 | `DatePicker`、`RangePicker` |
| Transfer / Cascader | `.el-transfer`、`.el-cascader`、`.ant-transfer`、`.ant-cascader` | 双列表 / 级联菜单 | `Transfer`、`Cascader` |
| Upload 上传 | `.el-upload`、`.ant-upload`、`.MuiDropzone` | 拖放区 / 文件列表 | `Upload` |
| Descriptions / 表单版式 | `.el-descriptions`、`.ant-descriptions` | 标签-值网格 | `Descriptions` |
| Timeline 时间线 | `.el-timeline`、`.ant-timeline` | 垂直节点 | `Timeline` |
| 导航 / 菜单 / 侧边栏 | `.el-menu`、`.ant-menu`、`.MuiDrawer`、`*-sider`、`*-nav` | 侧边列表 | `Menu`、`Sider` |

### 覆盖与包装（发现之后）

库前缀 ≠ 产品外观。簇被升级之后：

1. 若产品覆盖了库的内部样式（头部渐变、页脚 `justify-content`、节点缩进），把这些属性复制进演示。
2. 包装组件（包住 `.el-dialog` 的 `BizDialog`）：演示包装器的插槽，而不是一个裸的库控件。
3. 捕获 CSS/DOM 中实际存在的状态：hover、selected、disabled、open、loading、empty。
4. 绝不因为某个高频或具有插槽形态的自定义前缀不在表里就省略它。以观测到的名称作为区块标题。

若只知道类名而未找到布局 CSS/DOM，展示一个最小演示，并标记 `data-evidence="source-class-only"`。

## 主题提取方法

### 从编译后的 CSS 或 dist 中

1. 先读 `:root` 和 `:export` 块，例如 `rg -o ':export\{[^}]*\}' <file>`，或搜索 `rg -n ':root|--[a-zA-Z]+:'`。
2. 统计 CSS 选择器前缀以识别框架：`rg -o '\.(el|ant|Mui|v)-?[A-Za-z-]+' css/ | sort | uniq -c | sort -rn`。
3. 判断语义角色时，带命名的 token（`primary`、`mainColor`、`textLightColor`）优先于裸颜色频次。
4. 若无命名 token，用 `rg -o '#[0-9a-fA-F]{3,8}'` 提取颜色，频次仅作低置信度证据。

### 从 URL / SPA 中

1. 抓取 `index.html`；列出 CSS 与 JS 包、`<title>` 和可见的静态内容。
2. 在包内检索主题对象或框架特征：`createTheme`、`palette`、`MuiThemeProvider`、`el-button`、`ant-btn`、CSS-in-JS 字符串。
3. 有可用无头 Chromium 时渲染（如 `chrome-headless-shell --dump-dom`），检查真实的类名、文本和注入的 `<style>` 块。
4. 将运行时 DOM 视为最强的组件证据；仅来自包字符串的值标注为源码级证据。

### 计算样式确认（尽力而为）

有可用的无头浏览器时，将主色与实际元素核对：主按钮/链接、页面背景、顶栏。将 `computed` 记录为证据来源。若计算值与 token 文件不一致，以运行时 DOM 为准来呈现"用户看到的"，并两者都记录。

## 溯源标签格式

在生成的 HTML 中使用紧凑标签，使输出可审查：

```html
<!-- evidence: css=dist/chunk.css :export mainColor #673AB7 -->
<!-- evidence: dom=.MuiButton background-color rgb(103, 58, 183) -->
<div data-evidence="fallback">模拟组件，未在产物中确认</div>
```
