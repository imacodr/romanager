module.exports = {
  title: "moblox",
  tagline: "Making group management easier",
  url: "https://moblox.js.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "../files/logo.png",
  organizationName: "imacodr", // Usually your GitHub org/user name.
  projectName: "moblox", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "moblox",
      logo: {
        alt: "mobloxLogo",
        src: "/files/logo.png",
      },
      items: [
        {
          to: "docs",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/imacodr/moblox",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/moblox",
            },
            {
              label: "Discord",
              href: "https://discord.gg/VUUUhVzGKy",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/imacodr",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/imacodr/moblox",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} moblox`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/imacodr/moblox/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/imacodr/moblox/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
