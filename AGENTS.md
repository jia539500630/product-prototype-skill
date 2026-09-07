# AGENTS.md

> 本文件为在本仓库工作的 AI 编码代理（以及人类贡献者）提供项目指引。动手修改前请先读完本文件。

## 1. 项目概览

**product-prototype-skill** 是一个 Agent Skill 工程。核心交付物是 `theme-preview` skill：

给定一个**已存在产品**的 URL、`dist/` 静态构建目录或 CSS/JS/HTML 产物，生成一份**单文件、自包含的静态展示页**，忠实呈现该产品真实的主题 token 与检测到的组件，作为后续项目原型的基线。

本仓库**没有构建系统与测试框架**：skill 本体是纯 Markdown（YAML frontmatter + 正文），产物是纯静态 HTML。验证手段是 shell 命令（见第 5 节）。

开发过程使用 [obra/superpowers](https://github.com/obra/superpowers) 工作流（brainstorming → writing-plans → executing-plans 等），依赖被锁定在 `skills-lock.json`（含每个上游 skill 的 SHA-256 hash）。

## 2. 仓库结构

| 路径 | 说明 |
| --- | --- |
| `.agents/skills/theme-preview/SKILL.md` | **Skill 主文件（运行时唯一权威版本，英文）**。frontmatter 的 `name` / `description`（含中英文触发词）决定 skill 何时被调用 |
| `.agents/skills/theme-preview/references/` | Skill 参考文档：`contract-schema.md`（契约 JSON 规范）、`component-discovery.md`（组件发现流水线）、`framework-signatures.md`（框架/组件特征表）、`system-composition.md`（四层组成推理）、`showcase-skeleton.html`（中性页面骨架，**仅占位，不可照抄**） |
| `**/*.zh-CN.md` | 对应英文文件的**中文译本**，仅供阅读，运行时不加载。**修改英文原版时必须同步更新译本**（代码、命令、类名、枚举值保持英文原样） |
| `theme-preview-*.html` | Skill 的运行产物样例（如 `theme-preview-ip-emr-frontend-20260907-113120.html`、`theme-preview-ip-order-frontend.html`），按 skill 输出规则提交在仓库根目录 |
| `docs/superpowers/plans/` | 已执行的实施计划（含验证命令，可作回归参考） |
| `.superpowers/` | brainstorming 会话的本地运行状态（`server.pid`、临时 HTML）。**不要手工编辑** |
| `skills-lock.json` | 上游 superpowers skills 的版本锁（`source` + `computedHash`）。不要手工改 hash |
| `.gitignore` | 忽略 `__pycache__/`、`*.pyc`、`.codex` |

## 3. 核心规范：证据纪律（Evidence Discipline）

本工程的第一性原则（完整版见 `SKILL.md` 的 "Evidence Rules"），修改 skill 或使用它生成产物时都必须遵守：

1. **禁止凭记忆使用任何颜色、组件、框架或业务领域**——每个值必须能追溯到目标产物的源码 / DOM / 计算样式证据。
2. **四级溯源标注**：`source`（已观测）/ `inferred`（推断）/ `fallback`（兜底，可见标签必须含"模拟/未在产物中确认"）/ `chrome`（文档外壳）。
3. **`showcase-skeleton.html` 是中性占位骨架，不是模板**——其中的颜色、组件集与文案均不可抄入产物。
4. **产物是单个自包含 HTML**：无网络依赖、无框架、无真实交互；内嵌但不渲染 `script#theme-contract[type="application/json"]` 契约。
5. **输出文件命名**：`theme-preview-<sanitized-product>.html`；若已存在则追加 `-<YYYYMMDD-HHmmss>`，**绝不静默覆盖**。
6. **固定中文标记字样**：`已观测`、`推断`、`模拟/未在产物中确认`、`未找到证据`、`原型组合推断`——改动相关文案时保持这些字样不变。

## 4. 修改 Skill 本体的约定

- 行为逻辑改在 `SKILL.md`；新增长篇规范放 `references/`，并在 `SKILL.md` 中以 `Read references/...` 方式引用（按需加载，保持主文件精简）。
- `SKILL.md` frontmatter：`name: theme-preview` 不可改；`description` 中触发语需同时保留中英文。
- 中英同步：改 `X.md` 就同步改 `X.zh-CN.md`。
- references 中大量内容以 Markdown 表格承载，编辑后保持表格语法有效。

## 5. 验证与检查命令

无 `package.json`、无构建步骤。通用检查方式（shell）：

```sh
# 结构检查：产物必须是含契约的自包含 HTML
node -e "const fs=require('fs');const p=process.argv[1];const s=fs.readFileSync(p,'utf8');if(!s.includes('<!doctype html>')||!s.includes('id=\"theme-contract\"'))process.exit(1)" <file>.html

# 溯源检查：展示的颜色/标记应能在 evidence 注释或契约记录中找到
rg -n '<hex 或组件标记>' theme-preview-*.html

# 可见标签检查：推断与兜底内容必须有中文标注
rg -n '已观测|推断|模拟/未在产物中确认' theme-preview-*.html

# Skill 结构检查：frontmatter 正确闭合
rg -n '^---$' .agents/skills/theme-preview/SKILL.md
```

`docs/superpowers/plans/2026-09-07-ip-emr-theme-preview.md` 记录了上一次执行的完整验证命令，可复用为回归检查清单。

## 6. Git 与提交约定

- 现有提交信息极简（如 `update`），无强制 commit message 规范——用简洁的一句话说明改动即可。
- skill 生成的 `theme-preview-*.html` 按输出约定直接提交在仓库根目录。
- 不要提交：易变的运行状态文件（`.superpowers/*/state/` 下的 pid 等除非有意记录）、`.gitignore` 已列出的内容。

## 7. 常见陷阱（对本仓库的代理尤为重要）

- ❌ 把仓库里已有的 `theme-preview-*.html`（IP 医疗 EMR 的绿色配色等）当作新产品的"模板"复用——那只是**某个特定产品的历史产物**，不是模板。
- ❌ 修改 `SKILL.md` 后忘记同步 `SKILL.zh-CN.md`（references 下的译文同理）。
- ❌ 在产物 HTML 中引入外部 CSS / 字体 / 脚本链接（包括旧模板里的 Element-UI CDN 链接）。
- ❌ 编辑 `.superpowers/*/state/*`，或手工修改 `skills-lock.json` 中的 hash。
- ❌ 覆盖已存在的 `theme-preview-*.html`——应追加时间戳生成新文件。
- ❌ 给"只有框架特征签名支撑"的组件打上"已观测"标签。
