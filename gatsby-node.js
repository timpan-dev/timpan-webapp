const { resolve } = require(`path`)
const { format } = require('date-fns')
const _slugify = require('slugify')

const contentWidth = 600

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  type MarkdownRemark implements Node @dontInfer {
      frontmatter: FrontmatterRemark
      fields: FieldsRemark
    }

    type FieldsRemark {
      urlPath: String!
      source: String!
    }

    type ImageDesc {
      source: File @fileByRelativePath
      title: String
    }

    type ImageContext {
      files: [ImageDesc]
    }

    type AudioDesc {
      source: File @fileByRelativePath
      title: String
    }

    type AudioContext {
      cover: File @fileByRelativePath
      files: [AudioDesc]
    }

    type FrontmatterRemark {
      id: String!
      title: String!
      date: Date
      desc: String!
      tags: [String]
      type: String!
      cover: File @fileByRelativePath
      image: ImageContext
      audio: AudioContext
      video: String
    }
  `
  createTypes(typeDefs)
}

function slugify(title) {
  return _slugify(title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: true,
  })
}

function formatPostUrl (slug, date) {
  return `/blog/${format(date, 'yyyy/MM')}/${slug}`
}

function formatAlbumUrl(slug) {
  return `/album/${slug}`
}

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx` || node.internal.type === `MarkdownRemark`) {
    
    const source = getNode(node.parent).sourceInstanceName
    // const renderer = node.internal.type === `Mdx` ? 'mdx' : 'remark'

    let urlPath
    let slug

    switch (source) {
      case "posts": {
        slug = slugify(node.frontmatter.title)
        const date = new Date(node.frontmatter.date)
        urlPath = formatPostUrl(slug, date)
        break
      }
      case "albums": {
        slug = slugify(node.frontmatter.title)
        urlPath = formatAlbumUrl(slug)
        break
      }
      default:
        throw new Error("invalid markdown source")
    }

    createNodeField({
      node,
      name: `urlPath`,
      value: urlPath,
    })

    createNodeField({
      node,
      name: `source`,
      value: source,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      site {
        siteMetadata {
          postsPerPage
        }
      }
      allMarkdownRemark(filter: { fields: { urlPath: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              id
            }
            fields {
              urlPath
              source
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.fields.source === 'posts'
  )

  const albums = result.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.fields.source === 'albums'
  )

  posts.forEach(({ node }) => {
    const { id } = node.frontmatter
    const { urlPath } = node.fields

    createPage({
      path: urlPath,
      component: resolve(`./src/templates/post.tsx`),
      context: { id, urlPath, contentWidth },
    })
  })

  albums.forEach(({ node }) => {
    const { id } = node.frontmatter
    const { urlPath } = node.fields
    createPage({
      path: urlPath,
      component: resolve(`./src/templates/album.tsx`),
      context: { id, urlPath, contentWidth }
    })
  })

  const { postsPerPage } = result.data.site.siteMetadata
  
  let numPages = Math.ceil(posts.length / postsPerPage)
  for (let i = 0; i < numPages; i++) {
    let path = i === 0 ? `/` : `/${i + 1}`
    createPage({
      path,
      component: resolve('./src/templates/posts.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        contentWidth,
      },
    })
  }

  numPages = Math.ceil(albums.length / postsPerPage)
  for (let i = 0; i < numPages; i++) {
    let path = i === 0 ? `/albums` : `/albums/${i + 1}`
    createPage({
      path,
      component: resolve("./src/templates/albums.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        contentWidth
      }
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if (!page.context.contentWidth) {
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        contentWidth,
      },
    })
  }
}
