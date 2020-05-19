module.exports = {
  siteMetadata: {
    title: `Тимпан`,
    description: `Творческий колектив «Тимпан». Официальный сайт.`,
    author: `© коллектив «Тимпан»`,
    keywords: [
      "тимпан",
      "тимпан сайт",
      "тимпан официальный сайт",
      "тимпан блог",
      "творческий колектив тимпан",
      "колектив тимпан",
      "тимпан аудио",
      "тимпан видео",
      "тимпан концерты",
      "тимпан выступления",
      "тимпан новости"
    ].join(", "),
    lang: "ru",
    postsPerPage: 10,
    siteUrl: `https://timpan-team.web.app`,
    youtubeUrl: `https://www.youtube.com/channel/UCGLXZ38NNq36ecv4N7caU9Q`,
    instagramUrl: `https://instagram.com/timpan.by`,
    vkUrl: `https://vk.com/public_timpan`
  },
  plugins: [
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "~": `${__dirname}/src/`
      }
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Творческий колектив «Тимпан». Официальный сайт.`,
        short_name: `Timpam-team.web.app`,
        start_url: `/`,
        background_color: `#E2AA2B`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/assets/fav.png`,
        include_favicon: true
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/content/data`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/posts`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/content/pages`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `albums`,
        path: `${__dirname}/src/content/albums`,
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sidebar-audio`,
        path: `${__dirname}/src/content/sidebar`,
        ignore: [`**/\.*`]
      }
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
              sizeByPixelDensity: true
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: f => `linked-files/${f.hash}/${f.name}`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`]
            }
          }
        ]
      }
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
              sizeByPixelDensity: true
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: f => `linked-files/${f.hash}/${f.name}`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`]
            }
          }
        ]
      }
    },
    // {
    //   resolve: `gatsby-plugin-graphql-codegen`,
    //   options: {
    //     fileName: `graphqlTypes.d.ts`,
    //     documentPaths: [
    //       "./src/**/*.{ts,tsx}",
    //       "./node_modules/gatsby-*/**/*.js"
    //     ],
    //     codegenDelay: 5000
    //   }
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/ // See below to configure properly
        }
      }
    }
  ]
}
