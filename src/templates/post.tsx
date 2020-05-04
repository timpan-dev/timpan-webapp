import React from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Layout from '~/components/Layout'
import { PostByUrlPathQuery, IPost } from '~/types'
import { formatPostFromData } from "~/utils/post"

interface IPostViewTemplateProps {
  data: PostByUrlPathQuery
}

const PostViewTemplate: React.FC<IPostViewTemplateProps> = ({ data }) => {
  const post = formatPostFromData(data.markdownRemark)

  return (
    <Layout>
      <article>
        <header>
          <h2>{post.title}</h2>
          <h3>{format(new Date(post.date), "d MMMM, yyyy", { locale: ru })}</h3>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </main>
      </article>
    </Layout>
  )
}
export default PostViewTemplate

export const query = graphql`
  query postByURLPath($urlPath: String!) {
    markdownRemark(fields: { urlPath: { eq: $urlPath } }) {
      ...PostDataFragment
    }
  }
`