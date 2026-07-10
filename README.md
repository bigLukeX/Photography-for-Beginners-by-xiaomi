# 小米 15 Ultra 摄影教程站

一个面向摄影初学者的电子教程站，主题是“从一台手机开始，把摄影学扎实”。

项目内容以 `小米 15 Ultra` 为起点，但教程本身并不把用户困在手机摄影技巧里，而是持续强调可以迁移到相机的摄影基础：主体、构图、光线、焦段、曝光、后期和拍摄流程。

线上地址：

- [教程首页](https://biglukex.github.io/Photography-for-Beginners-by-xiaomi/)
- [课程学习路线](https://biglukex.github.io/Photography-for-Beginners-by-xiaomi/course-outline/)
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
- 第 19 章：参数工具箱与拍摄配方
- 互动实验室：焦距/站位、快门拖影、ISO 颗粒、曝光、lofi 风格配方和 Three.js 空间/光线实验
- 主线专题：焦距与透视、曝光、色彩、选片、后期和组图叙事
- 按需专题：真实样张阅读、专业模式工具、简易补光与拍摄伦理
- 分层作业、点评模板和“拍摄 → 点评 → 重拍”闭环

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

教程按教学依赖而不是单纯按章节编号阅读：

1. 起步：手机相机 App 到手即用
2. 视觉基础：第 1-3 章，建立主体、构图和看光能力
3. 空间与控制：焦距专题 → 第 4-5 章 → 曝光 → 色彩 → 第 10 章
4. 题材实战：第 6-9 章，人像、街拍、风景夜景和静物
5. 成片闭环：第 11 章 → 选片 → 后期 → 组图 → 第 12 章
6. 高级创作：先第 17 章看风格地图，再读第 13-16、18-19 章

侧边栏和页面底部上一页/下一页使用同一顺序。章节编号和 slug 保持稳定，避免旧链接失效。

每章的设计目标基本一致：

- 讲清一个核心摄影问题
- 给出 `小米 15 Ultra` 的实战方法
- 提供练习题
- 提供点评标准
- 补充“换成相机时怎么迁移”

## 项目结构

主要目录：

- `src/content/docs/`
  教程正文、首页、404、课程目录、练习说明、互动实验室页面
- `src/components/`
  教程示意组件和内容卡片
- `src/styles/custom.css`
  全站视觉样式、响应式规则、示意模块样式
- `src/assets/`
  本地插图和开放许可教学样张
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
- [docs/IMAGE_CREDITS.md](/Users/nickxy/Desktop/photograph/docs/IMAGE_CREDITS.md)

## 可复用内容组件

当前已经有这些组件：

- `ChapterCard`
  首页章节预览卡片
- `PracticeCard`
  带核心版、完整挑战和点评后重拍提示的练习任务卡片
- `ParamCard`
  各章节参数起点、参数表和拍摄配方卡片
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
- `InteractiveLab`
  使用 `SVG` 和 `Canvas 2D` 的互动实验室
- `ThreeLab`
  使用 `Three.js` 的 3D 焦距、透视和光线方向实验
- `SampleGallery`
  带教学说明、作者、许可和来源链接的真实样张组件
- `CourseRoadmap`
  课程目录顶部的六阶段学习路线图

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
- 参数内容采用“系统总章 + 每章参数卡”的混合结构，给范围、场景和代价，不写成唯一标准答案。
- 示意图解释变量，真实样张训练复杂现场里的判断，两者不互相替代。
- 每个作业允许做 20 分钟核心版，并通过点评后重拍形成闭环。
- 涉及真实人物时，明确同意、公开范围和现场边界。

## 推荐的后续开发顺序

如果继续扩写，建议按这个顺序：

1. 用用户后续作业建立“初拍 → 点评 → 重拍”匿名案例页
2. 补小米 15 Ultra 实机界面截图，并标注 HyperOS 版本
3. 给第 19 章补同场景、保留 EXIF 的原创参数对照组
4. 继续细化后期章节，加入可撤销的前后对照流程

主线已经完整，后续重点应从“继续增加章节”转向“原创案例、真实作业、实机截图和参数对照”。

## 图片与协议

项目代码和原创文本使用 [MIT License](./LICENSE)。第三方教学样张保留各自的 Creative Commons 许可，不因项目 MIT 协议而改变；作者、许可和原始链接见 [docs/IMAGE_CREDITS.md](./docs/IMAGE_CREDITS.md)。

## 接手文档

如果是人类或其他 AI 要继续接手这个项目，建议先看：

- [AGENTS.md](/Users/nickxy/Desktop/photograph/AGENTS.md)
- [docs/PROJECT_OVERVIEW.md](/Users/nickxy/Desktop/photograph/docs/PROJECT_OVERVIEW.md)
