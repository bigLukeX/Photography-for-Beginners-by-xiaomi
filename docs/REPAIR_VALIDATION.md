# 2026-10-28 修复与发布验证

本轮采用核实后的评审方案：保留章节 slug 与侧边栏顺序，修正参数前提、窄屏阅读、练习层级、图片发布与维护文档。以下行号对应本轮提交。

## 修复位置

| 任务 | 文件与位置 | 改动与验收 |
| --- | --- | --- |
| P0-1 | `src/content/docs/chapters/10-manual-controls.mdx:48`、`19-parameter-toolbox-and-recipes.mdx:46`；同步第 6–8 章参数卡 | 明确主摄 f/1.63、强光与阴影边界、实际可用档位；不承诺 HDR 或一组数字适合所有白天场景。构建及页面检查通过。 |
| P0-2 | `src/content/docs/guides/focal-perspective-depth.mdx:156`、第 19 章迁移段 | 区分实际与等效焦距、景深比较与曝光 f 值；光圈换算为 2.6/3.6 档，闪光同步以设备说明为准。下方列出复算。 |
| P0-3 | `src/content/docs/chapters/19-parameter-toolbox-and-recipes.mdx:306`、`guides/exposure-dynamic-range.mdx:135` | 用明确的快门/ISO 配对说明等亮；快门变慢时 ISO 降低，提示同时变化的画质代价。 |
| P1-1 | `src/components/ParamCard.astro:16`、`src/styles/custom.css:172` | 表格按容器宽度切换堆叠，每行保留四个字段；390px 与 834px 下全部单元格可读，无卡片内部横滚。 |
| P1-2 | `src/components/SampleGallery.astro:153`、`GeneratedLessonVisual.astro:29`、`EditingWalkthrough.astro:29`、`ImageZoom.astro:25` | 正文响应式 WebP、三联图构建期分幅与懒加载、大图不放大源文件；保留 JPEG 跟做及文件像素尺寸。实测见下方。 |
| P1-3 | `src/components/PracticeCard.astro:14`；第 11、12 章与选片、后期专题 | 默认提供自评路径，清单明确属于完整挑战；选片与后期分别允许重选、重修。全站有层级的卡片均具有明确清单标题。 |
| P1-4 | `src/content/docs/guides/street-portrait-ethics.mdx:14`、`:52` | 增加官方法条入口、未成年人公开边界、仅删除相关照片的操作示例，以及云端和发布副本的处理限制。 |
| P1-5 | `src/content/docs/chapters/06-portraits.mdx:236` | 同意参与的人、自我拍摄和玩偶并列；提供桌面、靠墙、书堆支撑，区分玩偶无法练习的表情互动。 |
| P2-1 | `src/assets/lessons/post-process-triptych.jpg`、`docs/AI_IMAGE_ASSETS.md:18` | 确认无代码引用后删除停用源文件，保留历史 prompt 记录；旧文件本来就不在发布产物中。 |
| P2-2 | `src/content/docs/guides/photo-selection-workflow.mdx`、`docs/VISUAL_AUDIT.md`、`docs/IMAGE_CREDITS.md` | 加入 selection 样张组并同步文档；三张是不同人物、位置的照片，不声称同底片或单变量实验。 |
| P2-3 | `docs/AI_IMAGE_ASSETS.md:3` | 明确源 JPEG 88 与发布 WebP 84 是不同编码阶段；真实样张 80、后期演示 90，未强行统一质量参数。 |
| P2-4/5 | `README.md`、`AGENTS.md`、`docs/PROJECT_OVERVIEW.md` | 29 个组件均有记录；根目录文档中的本地绝对文件链接改为相对链接。 |
| P2-6 | `astro.config.mjs:20`、`public/social-card.png`、`src/assets/social-card.svg` | 1200 × 630 代码排版社交卡；36 页 OG/Twitter 图片 URL 均包含项目子路径。 |
| P2-7 | `src/components/ChapterCard.astro`、`src/content/docs/index.mdx:38` | 首页卡片可以点击并有键盘焦点，标明部分预览与完整目录入口；预览遵循课程依赖顺序。 |
| P2-8 | `src/content/docs/course-outline.mdx:145` | 建设日志换成读者可执行的练习入口。 |
| P2-9/10 | `src/content/docs/chapters/04-lens-and-focal-choices.mdx:55`、`guides/pro-mode-tools.mdx:69` | 明确近距离导致透视变化；定时档位以当前版本为准。 |

## 参数复算

固定光圈和现场光时，用 `快门时间 × ISO` 比较近似等亮关系：

- `1600/125 = 12.8`、`400/30 ≈ 13.33`、`100/8 = 12.5`，三组最大差约 `0.093` 档；标准快门档位取整使其近似而非完全相等。
- `log2(125/30) ≈ 2.059`、`log2(30/8) ≈ 1.907`：每次快门约慢两档，ISO 同时降两档。
- `log2(250/15) ≈ 4.059`；`1600→100` 降四档，两组输出差约 `0.059` 档。
- 光圈差为 `2 × log2(新 f 值 / 1.63)`：f/4 对应 `2.590` 档，f/5.6 对应 `3.561` 档。

这些计算不代替手机各镜头、HDR、多帧算法或实际 ISO/快门范围的实机测量。页面已说明当前版本限制。

## 构建与链接

```sh
GITHUB_ACTIONS=true GITHUB_REPOSITORY=bigLukeX/Photography-for-Beginners-by-xiaomi npm run build
npm test
git diff --check
du -sh dist/_astro
```

- 构建 36 页；Pagefind 索引与 sitemap 成功。
- 6/6 模型测试通过；diff 检查通过。
- 保留构建前已有的 Vite 单个分块超过 500KB 警告，无新增构建警告。
- 对产物中的站内链接、锚点、图片候选和脚本引用按生产子路径解析，3340 次引用检查全部通过。
- 36 页的 `og:image` 均为 `https://biglukex.github.io/Photography-for-Beginners-by-xiaomi/social-card.png`。

## 浏览器实测

Chrome DevTools 设备视口模拟，390 × 844 / DPR 2 与 834 × 1194 / DPR 2，逐页检查全部 36 页，共 72 次：

- 所有页面 `document.documentElement.scrollWidth === window.innerWidth`。
- 控制台无 error/warn。
- 第 19 章参数卡的 `clientWidth / scrollWidth`：手机 `356 / 356`，平板 `500 / 500`；所有正文单元格均位于可视宽度内，四组字段标签可见。
- 1440 × 1000 桌面保留四列表格；表格宽约 684px，卡片无内部横滚。
- 实际查看参数卡、三联模拟图、练习卡、真实样张及后期页面。
- 模拟图与真实样张均可打开大图、切换实际尺寸；Esc 关闭后焦点回到原链接。
- 后期第 4 步仍为饱和度 0.92；原图按钮恢复亮度、对比、饱和度均为 1。
- 跟做 JPEG 下载返回 HTTP 200、`image/jpeg`、180176 字节；1280 × 649，SHA-256 与仓库源文件相同。

## 图片结果与边界

- HTML `srcset` 数量：`0 → 69`。
- `_astro` 文件字节总量：`14204770 → 11215104`，下降 `21.05%`；当前 `du -sh` 为 `12M`（磁盘块占用与文件字节之和口径不同）。
- 原样发布的 JPEG：`22 → 1`，仅保留后期跟做下载。其余源 JPEG 仍在仓库中，不随网站重复发布。
- 390px、DPR 2 下霓虹样张选中 960px WebP，290722 字节；该次页面图片请求无 700KB 以上文件，未请求原始 JPEG。
- 三联图以 256/384/512px 候选分幅发布，保持原分栏内容；点开大图仍显示完整三联图。
- 未把“构建目录减半”作为通过条件：多个分辨率与完整大图都占构建空间，优先保证实际请求合适和教学细节完整；当前没有达到原建议的 50% 体积降幅。

部署沿用仓库现有 `main` 推送触发的 GitHub Pages 工作流；实际部署运行链接与线上复核结果在本次交付回复中提供。
