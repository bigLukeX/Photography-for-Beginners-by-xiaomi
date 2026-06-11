# 小米 15 Ultra 摄影教程站

一个面向摄影初学者的电子教程站，主题是“从一台手机开始，把摄影学扎实”。

项目内容以 `小米 15 Ultra` 为起点，但教程本身并不把用户困在手机摄影技巧里，而是持续强调可以迁移到相机的摄影基础：主体、构图、光线、焦段、曝光、后期和拍摄流程。

线上地址：

- [教程首页](https://biglukex.github.io/Photography-for-Beginners-by-xiaomi/)
- [第 1 章](https://biglukex.github.io/Photography-for-Beginners-by-xiaomi/chapters/01-clear-before-pretty/)

## 项目目标

- 做一套适合长期迭代的摄影电子教程，而不是零散笔记。
- 用 `MDX + Astro 组件` 的方式兼顾写作效率和网页表现力。
- 让每一章都可练、可交作业、可点评。
- 保持“手机当前可学”和“未来迁移相机也有用”两条价值同时成立。

## 当前进度

已完成正式内容：

- 第 1 章到第 12 章：基础、题材、参数、后期和拍摄流程
- 第 13 章到第 18 章：粗粝街头质感、失焦拖影、破碎取景、现场光梦境感、风格地图、lofi 个人系列
- 课程目录和练习与点评说明

## 技术架构

核心栈：

- `Astro`
- `Starlight`
- `MDX`
- `GitHub Pages`

为什么这样选：

- `Starlight` 适合文档/教程站，天然带目录、搜索、侧边导航。
- `MDX` 适合把教程正文和交互式示意组件写在一起。
- 站点最终输出为静态文件，适合 GitHub Pages 长期托管。

## 内容架构

教程目前按这条主线展开：

1. 先拍清楚，再拍好看
2. 构图入门
3. 学会看光
4. 小米 15 Ultra 的镜头与焦段选择
5. 摄影通用基础：焦距、透视、景深、曝光
6. 人像入门
7. 街拍与抓拍
8. 风景与城市夜景
9. 食物与静物
10. 手机手动模式与参数控制
11. 手机后期、选片与色彩整理
12. 建立自己的拍摄流程
13. 粗粝街头质感
14. 失焦、拖影与慢门
15. 奇怪角度与破碎取景
16. 现场光、溢出与梦境感
17. 风格地图与拍摄配方
18. Lofi 个人系列练习

每章的设计目标基本一致：

- 讲清一个核心摄影问题
- 给出 `小米 15 Ultra` 的实战方法
- 提供练习题
- 提供点评标准
- 补充“换成相机时怎么迁移”

## 项目结构

主要目录：

- `src/content/docs/`
  教程正文、首页、404、课程目录、练习说明
- `src/components/`
  教程示意组件和内容卡片
- `src/styles/custom.css`
  全站视觉样式、响应式规则、示意模块样式
- `src/assets/`
  本地插图资源
- `public/`
  favicon 等公开静态资源
- `docs/`
  项目接手说明、长期维护文档

关键文件：

- [astro.config.mjs](/Users/nickxy/Desktop/photograph/astro.config.mjs)
- [src/content.config.ts](/Users/nickxy/Desktop/photograph/src/content.config.ts)
- [src/content/docs/index.mdx](/Users/nickxy/Desktop/photograph/src/content/docs/index.mdx)
- [src/styles/custom.css](/Users/nickxy/Desktop/photograph/src/styles/custom.css)
- [00-摄影教程目录.md](/Users/nickxy/Desktop/photograph/00-摄影教程目录.md)

## 可复用内容组件

当前已经有这些组件：

- `ChapterCard`
  首页章节预览卡片
- `PracticeCard`
  练习任务卡片
- `BridgeNote`
  “迁移到相机”提示卡片
- `DoDontCard`
  常见错误 / 推荐做法对比卡
- `FrameScanDemo`
  第 1 章边缘检查示意
- `CompositionDemo`
  第 2 章构图示意
- `LightDemo`
  第 3 章光线方向示意
- `GrainContrastDemo`
  高反差、低饱和和颗粒感示意
- `BlurMotionDemo`
  失焦、慢门和拖影示意
- `OddAngleDemo`
  奇怪角度和不完整人物示意
- `DreamLightDemo`
  现场光、高光溢出和梦境感示意
- `StyleMapDemo`
  音乐风格、摄影师启发和视觉语言的关系示意

这套组件的目标不是做成“前端组件库”，而是让教程能更稳定地扩写，避免每章都从零做页面结构。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

本地预览构建产物：

```bash
npm run preview
```

默认开发地址通常是：

```text
http://localhost:4321
```

## 响应式与访问方式

这个站点默认就是网页形态，所以：

- 手机浏览器可以直接访问
- 平板浏览器可以直接访问
- 桌面端会显示完整侧边栏和目录
- 小屏设备会切成更适合阅读的单列布局

当前已经实测过：

- 手机视口：`390 x 844`
- 平板视口：`834 x 1194`

## 内容写作原则

整套教程目前遵循这些原则：

- 用中文写作，面向摄影初学者。
- 讲清“为什么”，不只给“怎么按”。
- 先讲判断，再讲设备。
- 避免过度术语化，必要时把术语讲成人话。
- 每章都尽量能马上练，而不是只读不拍。
- 默认兼顾未来迁移到相机的可用性。

## 推荐的后续开发顺序

如果继续扩写，建议按这个顺序：

1. 给高级篇补更多真实样张或原创插图
2. 做一个“风格练习索引页”，按失焦、慢门、颗粒、现场光等关键词聚合练习
3. 建立“作品作业示例页”，把后续拍摄练习整理成系列
4. 继续细化后期章节，加入不同风格的调色流程

现在主线已经完整，后续重点应该从“补章节”转向“补案例、补作品和补风格训练路径”。

## 接手文档

如果是人类或其他 AI 要继续接手这个项目，建议先看：

- [AGENTS.md](/Users/nickxy/Desktop/photograph/AGENTS.md)
- [docs/PROJECT_OVERVIEW.md](/Users/nickxy/Desktop/photograph/docs/PROJECT_OVERVIEW.md)
