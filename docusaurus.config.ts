import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

const config: Config = {
  title: 'DCI Cookbook',
  tagline: 'a collection of articles and examples on how to use DCI platform',
  favicon: 'img/favicon.ico',

  url: 'https://cookbook.doit.com',
  baseUrl: '/dci-cookbook/', //gh-pages workaround


  onBrokenLinks: 'throw',


  markdown: {
    format: 'md',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },


  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  projectName: 'doitintl.github.io',
  organizationName: 'doitintl',
  trailingSlash: false,

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Serve docs at root
          sidebarPath: './sidebars.ts',
          editUrl: undefined, // Disable edit URL for now as content is generated
          tags: '../src/data/tags.yaml',
        },
        blog: false, // Disable blog for now as we use docs for articles
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function docusaurusPluginYamlLoader(context, options) {
      return {
        name: 'docusaurus-plugin-yaml-loader',
        configureWebpack(config, isServer) {
          return {
            module: {
              rules: [
                {
                  test: /\.ya?ml$/,
                  use: 'yaml-loader',
                },
              ],
            },
          };
        },
      };
    },
  ],



  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'DCI Cookbook',
      logo: {
        alt: 'DCI Cookbook Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Articles',
        // },
        {
          href: 'https://github.com/doitintl/dci-cookbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'DoiT International',
              href: 'https://www.doit.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DoiT International. ends.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
