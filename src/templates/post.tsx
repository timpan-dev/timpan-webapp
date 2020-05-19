import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '~/components/Layout'
import { PostByUrlPathQuery, IPost } from '~/types'
import { formatPostFromData } from '~/utils/post'
import { pageWidth, gapWidth } from '~/utils/styling'
import PostView from '~/components/views/PostView'
import Sidebar from '~/components/Sidebar'
import SEO from '~/components/SEO'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  max-width: ${ pageWidth }px;
  margin: 10px auto;
  justify-content: stretch;
`

const Main = styled.div`
  width: 67%;
  flex: 2;
  @media (max-width: 700px) {
    width: 100%;
    margin: 0 5px;
  }
`

const SidebarDiv = styled.div`
  width: 33%;
  flex: 1;
  margin-left: ${gapWidth}px;
  @media (max-width: 700px) {
    display: none;
    margin-left: 0;
  }
`

interface IPostViewTemplateProps {
  data: PostByUrlPathQuery
}

const PostViewTemplate: React.FC<IPostViewTemplateProps> = ({ data }) => {
  const post = formatPostFromData(data.markdownRemark)

  return (
    <Layout>
      <Container>
        <Main>
          <PostView post={post} />
        </Main>
        <SidebarDiv>
          <Sidebar />
        </SidebarDiv>
      </Container>
      <SEO></SEO>
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