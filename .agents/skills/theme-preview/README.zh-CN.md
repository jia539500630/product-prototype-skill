# theme-preview Skill 中文翻译说明

本目录下的 `*.zh-CN.md` 文件是对应英文原文的**准确中文译本**，仅供阅读理解使用，
不会影响 skill 的运行（运行时仍读取 `SKILL.md` 及 `references/` 下的英文文件）。

对应关系：

| 英文原文 | 中文译本 |
| --- | --- |
| `SKILL.md` | `SKILL.zh-CN.md` |
| `references/contract-schema.md` | `references/contract-schema.zh-CN.md` |
| `references/component-discovery.md` | `references/component-discovery.zh-CN.md` |
| `references/framework-signatures.md` | `references/framework-signatures.zh-CN.md` |
| `references/system-composition.md` | `references/system-composition.zh-CN.md` |

翻译约定：

- 代码、命令、类名、属性名、文件名、HTML 注释约定（如 `<!-- evidence: ... -->`）一律保持英文原样，以免破坏 skill 的实际约定。
- `provenance` 的四个枚举值 `source` / `inferred` / `fallback` / `chrome` 保持英文，并分别对应中文说法：源码级（已观测）/ 推断 / 兜底 / 文档外壳。
- `references/showcase-skeleton.html` 本身已是中文占位骨架，无需翻译。
