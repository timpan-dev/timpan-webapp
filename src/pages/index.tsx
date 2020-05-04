import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~/components/Layout'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { PostsForIndexPageQuery, IPost } from '~/types'
import { formatPostFromData } from '~/utils/post'

interface IIndexPageProps {
  data: PostsForIndexPageQuery
}

const IndexPage: React.FC<IIndexPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(({ node }, index) => formatPostFromData(node, index))

  return <Layout>{
    posts.map((post: IPost, index) => {
      return (
        <article key={index}>
          <header>
            <Link to={post.urlPath}>
              <h2>{post.title}</h2>
            </Link>
            <h3>{format(new Date(post.date), "d MMMM, yyyy", { locale: ru })}</h3>
          </header>
          <main>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </main>
        </article>
      )
    })
  }</Layout>
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
          }
        }
      }
    }
  }
`

