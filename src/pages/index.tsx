import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~/components/Layout'
import { format } from 'date-fns'
import { ru } from "date-fns/locale"

interface IIndexPageProps {
  data: any
}

const IndexPage: React.FC<IIndexPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge: any, index: number) => {
    const {id, frontmatter, fields, html} = edge.node
    return (
      <article key={index}>
        <header>
          <Link to={fields.urlPath}>
            <h2>{frontmatter.title}</h2>
          </Link>
          <h3>{format(new Date (frontmatter.date), 'd MMMM, yyyy', {locale: ru})}</h3>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
      </article>
    )
  })
  return <Layout>
    {posts}
  </Layout>
}

export default IndexPage

export const query = graphql`
  query postsForIndexPage {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fields: { urlPath: { ne: null }, source: { eq: "posts" } }
      }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            date
            desc
            type
            image {
              files {
                source {
                  publicURL
                }
                title
              }
            }
            video {
              id
            }
          }
          fields {
            urlPath
            source
            renderer
            slug
          }
        }
      }
    }
  }
`

