import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repository ? repository.split('/') : [];
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true' && owner && repo;

export default defineConfig({
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://example.com'),
  base: isGitHubActions ? `/${repo}/` : '/',
  integrations: [
    starlight({
      title: '小米 15 Ultra 摄影教程',
      description: '从手机出发，学习可迁移到相机的摄影基础、拍摄判断和创作习惯。',
      tagline: '从一台手机开始，把摄影学扎实。',
      favicon: '/favicon.svg',
      customCss: ['/src/styles/custom.css'],
      lastUpdated: true,
      disable404Route: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      sidebar: [
        {
          label: '开始',
          items: ['course-outline', 'practice-and-critiques', 'labs/interactive-lab'],
        },
        {
          label: '先修与专题',
          items: [
            'guides/00-camera-app-quickstart',
            'guides/focal-perspective-depth',
            'guides/exposure-dynamic-range',
            'guides/color-foundations',
            'guides/post-processing-workflow',
            'guides/photo-selection-workflow',
            'guides/sequence-storytelling',
          ],
        },
        {
          label: '章节',
          items: [
            'chapters/01-clear-before-pretty',
            'chapters/02-composition-basics',
            'chapters/03-learn-to-see-light',
            'chapters/04-lens-and-focal-choices',
            'chapters/05-universal-foundations',
            'chapters/06-portraits',
            'chapters/07-street-and-candid',
            'chapters/08-landscape-and-night',
            'chapters/09-food-and-still-life',
            'chapters/10-manual-controls',
            'chapters/11-editing-and-selecting',
            'chapters/12-build-a-workflow',
          ],
        },
        {
          label: '高级创作篇',
          items: [
            'chapters/13-rough-street-texture',
            'chapters/14-blur-motion-and-slow-shutter',
            'chapters/15-odd-angles-and-fragmented-frames',
            'chapters/16-dream-light-and-unreal-color',
            'chapters/17-style-map-and-shooting-recipes',
            'chapters/18-personal-series-lofi-diary',
            'chapters/19-parameter-toolbox-and-recipes',
          ],
        },
      ],
    }),
  ],
});
