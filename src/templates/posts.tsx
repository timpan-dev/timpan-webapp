import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import Layout from '~/components/Layout'
import { PostsForPageQuery, IPost } from '~/types'
import { formatPostFromData } from '~/utils/post'
import SmallPostView from "~/components/views/SmallPostView"
import Head from '~/components/Head'
import { pageWidth, primaryColor, secondaryColor, brighten, darken, gapWidth } from '~/utils/styling'
import Sidebar from '~/components/Sidebar'
import SEO from '~/components/SEO'
import Pagination from '~/components/Pagination'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  max-width: ${ pageWidth }px;
  margin: 80px auto 40px;
  justify-content: stretch;
`

const Main = styled.div`
  width: 67%;
  flex: 2;
  @media (max-width: 700px) {
    width: 100%;
    margin: 0 10px;
    display: none;
    &.active {
      display: block;
    }
  }
`

const SidebarDiv = styled.div`
  width: 33%;
  flex: 1;
  margin-left: ${2*gapWidth}px;
  @media (max-width: 700px) {
    display: none;
    margin: 0 20px;
    &.active {
      display: block;
    }
  }
`

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px 0;
  @media (min-width: 700px) {
    display: none;
  }
`

const Space = styled.div`
  flex: 1;
`

const Tab = styled.div`
  text-align: center;
  padding: 8px 33px 4px;
  font-size: 20px;
  border-bottom: 1px solid #222;
  cursor: pointer;
  color: #222;
  &:visited { color: #222; }
  &:hover {
    color: ${ brighten('#222')};
    border-bottom: 1px solid ${ brighten('#222')};
  }
  &:active {
    color: ${ darken('#222') };
    border-bottom: 1px solid ${ darken('#222')};
  }
  &.active {
    border-bottom: 1px solid ${primaryColor};
    color: ${primaryColor};
    &:visited { color: ${primaryColor}; }
    &:hover { color: ${ brighten(primaryColor)} !important; }
    &:active { color: ${ darken(primaryColor) } !important; }
  }
  @media (min-width: 700px) {
    display: none;
  }
`

interface IPostListTemplateProps {
  data: PostsForPageQuery
  pageContext: any
}

const PostListTemplate: React.FC<IPostListTemplateProps> = ({ data, pageContext }) => {
  const [activeTab, setActiveTab] = useState(0)
  const posts = data.allMarkdownRemark.edges.map(({ node }, index) => formatPostFromData(node, index))

  const { currentPage, numPages } = pageContext
  return (
    <Layout showSmallHead={false}>
      <Head />
      <TabBar>
        <Space></Space>
        <Tab
          className={activeTab === 0 ? "active" : null}
          onClick={() => activeTab !== 0 && setActiveTab(0)}
        >
          Новости
        </Tab>
        <Tab
          className={activeTab === 1 ? "active" : null}
          onClick={() => activeTab !== 1 && setActiveTab(1)}
        >
          Медиа
        </Tab>
        <Space></Space>
      </TabBar>
      <Container>
        <Main className={activeTab === 0 ? "active" : null}>
          {posts.map((post: IPost, index) => {
            return <SmallPostView key={index} post={post} />
          })}
          <Pagination
            className="fixed-width mb-2"
            currentPage={currentPage}
            numberOfPages={numPages}
            getPageUriByIndex={n => (n === 1 ? `/` : `/${n}`)}
          />
        </Main>
        <SidebarDiv className={activeTab === 1 ? "active" : null}>
          <Sidebar />
        </SidebarDiv>
      </Container>
      <SEO></SEO>
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
