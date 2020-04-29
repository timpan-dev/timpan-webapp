import React from 'react'
import { graphql } from 'gatsby'
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import Layout from "~/components/Layout"

interface IPostViewTemplateProps {
  data: any
}

const PostViewTemplate: React.FC<IPostViewTemplateProps> = ({ data }) => {
  const { id, frontmatter, fields, html } = data.markdownRemark
  return (
    <Layout>
      <article>
        <header>
          <h2>{frontmatter.title}</h2>
          <h3>
            {format(new Date(frontmatter.date), "d MMMM, yyyy", { locale: ru })}
          </h3>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
      </article>
    </Layout>
  )
}
export default PostViewTemplate

export const query = graphql`
  query postByURLPath($urlPath: String!) {
    markdownRemark(fields: { urlPath: { eq: $urlPath } }) {
      id
      html
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
`