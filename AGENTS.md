# AGENTS.md

这个文件给接手本项目的 AI 代理使用。

## 项目一句话

这是一个基于 `Astro + Starlight + MDX` 的摄影电子教程站，主题是“从一台小米 15 Ultra 开始，学习可迁移到相机的摄影基础”。

## 当前目标

持续扩写和打磨教程页，并保持：

- 新手友好
- 可练习
- 有示意
- 可迁移到相机
- 手机和平板阅读体验良好
- 高级创作篇也要落到可执行练习，而不是只堆风格词
- 参数内容采用“总章 + 每章参数卡”的混合结构，不要把所有数字只堆在一个地方

## 关键路径

- `src/content/docs/`
  站点内容页，包括章节、目录、练习说明和互动实验室
- `src/components/`
  教程专用 Astro 组件
- `src/styles/custom.css`
  站点统一样式和响应式逻辑
- `astro.config.mjs`
  站点配置、侧边栏、GitHub Pages base 相关逻辑
- `src/content.config.ts`
  Starlight docs collection 配置
- `00-摄影教程目录.md`
  原始课程蓝图

## 目前内容状态

正式章节已经覆盖：

- `01` 到 `12`：摄影基础、题材、参数、后期和流程
- `13` 到 `18`：粗粝质感、失焦拖影、破碎取景、现场光梦境感、风格地图、lofi 个人系列
- `19`：参数工具箱与拍摄配方
- `labs/interactive-lab`：SVG + Canvas + Three.js 互动实验室

## 内容约定

### 写作风格

- 使用中文
- 面向初学者
- 语气不要高冷或学院化
- 讲“判断逻辑”优先于“器材炫技”
- 用“手机当前就能练”的方式解释
- 默认补一段“换成相机时怎么迁移”
- 涉及参数时，优先给“范围 + 场景 + 代价”，不要写成唯一标准答案

### 正式章节通常应包含

- 开场：这一章解决什么问题
- 学完以后能做到什么
- 核心概念解释
- `小米 15 Ultra` 的具体拍法或设置建议
- 常见错误 vs 推荐做法
- 至少一个练习卡片
- 交作业前自检
- 我会怎么点评这一章
- 迁移到相机的说明
- 一句收束性的重点提醒

### 可复用组件优先

优先复用这些组件，而不是每章都重新发明版式：

- `PracticeCard`
- `ParamCard`
- `BridgeNote`
- `DoDontCard`
- `FrameScanDemo`
- `CompositionDemo`
- `LightDemo`
- `GrainContrastDemo`
- `BlurMotionDemo`
- `OddAngleDemo`
- `DreamLightDemo`
- `StyleMapDemo`
- `InteractiveLab`
- `ThreeLab`

如果新增组件，目标应该是“可在后面章节复用”，而不是只为单一页面写死。

互动实验室可以使用少量页面专用逻辑。`Three.js` 只用于空间、透视和光线方向这类平面图难讲清的问题，不要把所有示意都 3D 化。

## 技术约定

### 站内链接

这个项目部署在 `GitHub Pages` 的项目子路径下，不是根域名站点。

因此：

- 在首页、404、splash hero action 这类位置，优先使用相对路径，例如 `./course-outline/`
- 修改链接后要特别留意线上项目子路径是否会出错

### 样式

- 统一在 `src/styles/custom.css` 里维护
- 响应式逻辑已经存在，新增模块时要补手机布局
- 不要默认依赖桌面双栏布局，小屏上要能顺畅阅读

### 内容文件

- 章节文件在 `src/content/docs/chapters/`
- 尽量保持 slug 稳定，避免无必要改文件名
- frontmatter 的 `title` 和 `description` 要完整

## 开发命令

安装：

```bash
npm install
```

开发：

```bash
npm run dev
```

构建验证：

```bash
npm run build
```

预览：

```bash
npm run preview
```

## 每次改动后的最小验证

至少做这些：

1. `npm run build`
2. 打开相关页面看有没有明显排版问题
3. 检查控制台是否报错
4. 若改了布局或新组件，至少验证手机和一个平板视口

推荐视口：

- 手机：`390 x 844`
- 平板：`834 x 1194`

## 常见坑

- 用 `/course-outline/` 这类绝对路径时，线上项目子路径下可能 404
- Starlight 会自动渲染页面标题，不要在正文里重复写一级标题
- 新增示意组件时，别只看桌面效果，要补小屏单列布局

## 推荐接手顺序

如果你是新接手这个项目的 AI，建议先做：

1. 读 [README.md](/Users/nickxy/Desktop/photograph/README.md)
2. 读 [docs/PROJECT_OVERVIEW.md](/Users/nickxy/Desktop/photograph/docs/PROJECT_OVERVIEW.md)
3. 看 `01`、`07`、`13`、`16` 章的写法
4. 再开始补案例、插图、作品页或新的风格练习
