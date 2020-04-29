import React from 'react'
import { graphql } from 'gatsby'

interface IPageViewTemplateProps {
  data: any
}

const PageViewTemplate: React.FC<IPageViewTemplateProps> = ({ data }) => {
  return <h1>PageView</h1>
}
export default PageViewTemplate

export const query = graphql`
  query pageByURLPath($urlPath: String!) {
    mdx(fields: { urlPath: { eq: $urlPath } }) {
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
      }
    }
  }
`