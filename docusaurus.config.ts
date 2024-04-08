import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '卯榫 MortNon',
  tagline: '开质量的快速开发框架',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.mortnon.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mortise-and-tenon', // Usually your GitHub org/user name.
  projectName: 'mortnon', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '卯榫 MortNon',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '教程',
        },
        {
          href: 'https://docs.bookhub.tech',
          label: 'BookHub',
          position: 'right',
        },
        {
          href: 'https://gitee.com/mortise-and-tenon',
          label: 'Gitee',
          position: 'right',
        },
        {
          href: 'https://github.com/mortise-and-tenon',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '教程',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: '仓库',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mortise-and-tenon',
            },
            {
              label: 'Gitee',
              href: 'https://gitee.com/mortise-and-tenon',
            },
          ],
        },
        {
          title: "博客",
          items: [
            {
              label: '阿呜的边城',
              href: 'https://www.luansheng.fun',
            },
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mortnon.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
