import React from 'react'
import { graphql } from 'gatsby'

interface IPostListTemplateProps {
  data: any
}

const PostListTemplate: React.FC<IPostListTemplateProps> = ({ data }) => {
  return <h1>PostList</h1>
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
          id
          frontmatter {
            title
            date
            desc
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
