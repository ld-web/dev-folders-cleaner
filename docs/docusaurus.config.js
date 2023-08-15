// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Tauri DCleaner",
  tagline: "Dependencies & cache cleaner",
  favicon: "img/favicon.ico",
  url: "https://ld-web.github.io",
  baseUrl: "/tauri-dcleaner/",
  organizationName: "ld-web", // Usually your GitHub org/user name.
  projectName: "tauri-dcleaner", // Usually your repo name.
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Tauri DCleaner",
        logo: {
          alt: "Tauri DCleaner",
          src: "img/logo.svg",
        },
        items: [
          // {
          //   to: "#",
          //   className: "header-github-link",
          //   label: "Source",
          //   position: "right",
          // },
        ],
      },
      prism: {
        additionalLanguages: ["rust"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],
};

module.exports = config;
