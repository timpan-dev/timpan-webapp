module.exports = {
  siteMetadata: {
    title: `Тимпан`,
    description: `Творческий колектив «Тимпан». Официальный сайт.`,
    author: `© коллектив «Тимпан»`,
    keywords: [
      'тимпан',
      'тимпан сайт',
      'тимпан официальный сайт',
      'тимпан блог',
      'творческий колектив тимпан',
      'колектив тимпан',
      'тимпан аудио',
      'тимпан видео',
      'тимпан концерты',
      'тимпан выступления',
      'тимпан новости',
    ].join(', '),
    lang: 'ru',
    postsPerPage: 10,
    siteUrl: `https://timpan.web.app`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Творческий колектив «Тимпан». Официальный сайт.`,
        short_name: `Timpam.web.app`,
        start_url: `/`,
        background_color: `#E2AA2B`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/assets/fav.png`,
        include_favicon: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/posts`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/content/pages`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!--more-->`,
        footnotes: false,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 560,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: f => `linked-files/${f.hash}/${f.name}`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 560,
              quality: 70,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: f => `linked-files/${f.hash}/${f.name}`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
        ],
      },
    },
  ],
}
