# 小米 15 Ultra 摄影教程站

这是一个部署到 `GitHub Pages` 的摄影电子教程站，基于 `Astro + Starlight` 构建。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址通常是：

```text
http://localhost:4321
```

## 站点结构

- `src/content/docs/`：教程正文
- `src/components/`：练习卡片、迁移提示等可复用组件
- `src/styles/custom.css`：站点视觉样式
- `.github/workflows/deploy.yml`：GitHub Pages 自动部署

## 发布到 GitHub Pages

1. 在 GitHub 新建一个空仓库。
2. 把本地仓库关联到远端。
3. 推送到 `main` 分支。
4. 在 GitHub 仓库设置里把 Pages 的构建来源设为 `GitHub Actions`。

这个项目的 `astro.config.mjs` 会在 GitHub Actions 环境里根据仓库名自动设置 `base` 路径，适合部署到项目仓库的 Pages 地址。
