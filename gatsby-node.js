const { resolve } = require(`path`)
const { format } = require('date-fns')
const slugify = require('slugify')

const contentWidth = 560

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
      renderer: String!
    }

    type AudioDesc {
      source: File @fileByRelativePath
      title: String
    }

    type ImageDesc {
      source: File @fileByRelativePath
      title: String
    }

    type AudioContext {
      youtube: String
      files: [AudioDesc]
    }

    type VideoContext {
      id: String!
      audio: File @fileByRelativePath
    }

    type ImageContext {
      files: [ImageDesc]
    }

    type FrontmatterRemark {
      id: String!
      title: String!
      date: Date
      desc: String
      type: String
      audio: AudioContext
      video: VideoContext
      image: ImageContext
    }

    type Mdx implements Node @dontInfer {
      frontmatter: FrontmatterMdx
      fields: FieldsMdx
    }

    type FieldsMdx {
      urlPath: String!
      source: String!
      renderer: String!
    }

    type FrontmatterMdx {
      id: String!
      title: String!
      url: String
      date: Date
      desc: String
    }
  `
  createTypes(typeDefs)
}

function formatPostUrl (slug, date) {
  return `/blog/${format(date, 'yyyy/MM')}/${slug}`
}

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx` || node.internal.type === `MarkdownRemark`) {
    
    const source = getNode(node.parent).sourceInstanceName
    const renderer = node.internal.type === `Mdx` ? 'mdx' : 'remark'

    let urlPath
    let slug

    switch (source) {
      case 'posts': {
        slug = slugify(node.frontmatter.title)
        const date = new Date(node.frontmatter.date)
        urlPath = formatPostUrl(slug, date)
        break
      }
      case 'pages': {
        urlPath = node.frontmatter.url
        break
      }
      default:
        throw new Error('invalid markdown source')
    }

    createNodeField({
      node,
      name: `renderer`,
      value: renderer,
    })

    createNodeField({
      node,
      name: `urlPath`,
      value: urlPath,
    })

    // createNodeField({
    //   node,
    //   name: `slug`,
    //   value: slug ? slug : null
    // })

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
              renderer
            }
          }
        }
      }
      allMdx(filter: { fields: { urlPath: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              id
            }
            fields {
              urlPath
              source
              renderer
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

  const pages = result.data.allMdx.edges.filter(
    ({ node }) => node.fields.source === 'pages'
  )

  posts.forEach(({ node }) => {
    const { id, slug } = node.frontmatter
    const { urlPath } = node.fields

    createPage({
      path: urlPath,
      component: resolve(`./src/templates/post.tsx`),
      context: { id, slug, urlPath, contentWidth },
    })
  })

  pages.forEach(({ node }) => {
    const { id, slug } = node.frontmatter
    const { urlPath } = node.fields
    createPage({
      path: urlPath,
      component: resolve(`./src/templates/page.tsx`),
      context: { id, slug, urlPath, contentWidth },
    })
  })

  const { postsPerPage } = result.data.site.siteMetadata
  
  let numPages = Math.ceil(posts.length / postsPerPage)
  for (let i = 0; i < numPages; i++) {
    let path = i === 0 ? `/blog` : `/blog/page-${i + 1}`
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
