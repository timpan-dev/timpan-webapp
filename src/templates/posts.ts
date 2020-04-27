import React from 'react'
import { graphql } from 'gatsby'
import { PostsForPageQuery, IGasbyPageProps, IPost } from '~/types'
import Layout from '~/components/Layout'
import SmallPostView from '~/components/views/SmallPostView'
import ArticleContainer from '~/components/ArticleContainer'
import Pagination from '~/components/Pagination'
import { formatPostListFromData } from '~/utils/post'

interface IPostListTemplatePageContext {
  currentPage: number
  numPages: number
}

interface IPostListTemplateProps extends IGasbyPageProps {
  data: PostsForPageQuery
  pageContext: IPostListTemplatePageContext
}

const PostListTemplate: React.FC<IPostListTemplateProps> = ({
  data,
  pageContext,
}) => {
  const posts = formatPostListFromData(data)

  const { currentPage, numPages } = pageContext
  return (
    <Layout>
      <ArticleContainer>
        {posts.map((post, index) => (
          <SmallPostView post={post} key={index} />
        ))}
        <Pagination
          className="fixed-width mb-2"
          currentPage={currentPage}
          numberOfPages={numPages}
          getPageUriByIndex={n => (n === 1 ? `/blog` : `/blog/page-${n}`)}
        ></Pagination>
      </ArticleContainer>
    </Layout>
  )
}

export default PostListTemplate

export const query = graphql`
  query postsForPage($skip: Int!, $limit: Int!, $contentWidth: Int!) {
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
