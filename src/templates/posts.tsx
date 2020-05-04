import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~/components/Layout'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { PostsForPageQuery, IPost } from '~/types'
import { formatPostFromData } from '~/utils/post'

interface IPostListTemplateProps {
  data: PostsForPageQuery
}

const PostListTemplate: React.FC<IPostListTemplateProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(({ node }, index) => formatPostFromData(node, index))

  return (
    <Layout>
      {posts.map((post: IPost, index) => {
        return (
          <article key={index}>
            <header>
              <Link to={post.urlPath}>
                <h2>{post.title}</h2>
              </Link>
              <h3>
                {format(new Date(post.date), "d MMMM, yyyy", { locale: ru })}
              </h3>
            </header>
            <main>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </main>
          </article>
        )
      })}
    </Layout>
  )
}

export default PostListTemplate

export const query = graphql`
  query postsForPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        fields: { urlPath: { ne: null }, source: { eq: "posts" } }
      }
    ) {
      edges {
        node {
          ...PostDataFragment
        }
      }
    }
  }
`
