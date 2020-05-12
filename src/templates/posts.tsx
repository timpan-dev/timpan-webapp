import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import Layout from '~/components/Layout'
import { PostsForPageQuery, IPost } from '~/types'
import { formatPostFromData } from '~/utils/post'
import SmallPostView from "~/components/views/SmallPostView"
import Head from '~/components/Head'
import { pageWidth, primaryColor, secondaryColor, brighten, darken } from '~/utils/styling'

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

const Sidebar = styled.div`
  width: 33%;
  flex: 1;
  @media (max-width: 700px) {
    display: none;
  }
`

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`

const Space = styled.div`
  flex: 1;
`

const Tab = styled.div`
  text-align: center;
  padding: 8px 33px 0;
  border-bottom: 1px solid gold;
  &.active {
    border-bottom: 1px solid magenta;
  }
  cursor: pointer;
  color: ${primaryColor};
  &:visited {
    color: ${primaryColor};
  }
  &:hover {
    color: ${ brighten(primaryColor)};
  }
  &:active {
    color: ${ darken(primaryColor) };
  }
  @media (min-width: 700px) {
    display: none;
  }
`

interface IPostListTemplateProps {
  data: PostsForPageQuery
}

const PostListTemplate: React.FC<IPostListTemplateProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(({ node }, index) => formatPostFromData(node, index))

  return (
    <Layout>
      <Head />
      <TabBar>
        <Space></Space>
        <Tab>Новости</Tab>
        <Tab>Медиа</Tab>
        <Space></Space>
      </TabBar>
      <Container>
        <Main>
          {posts.map((post: IPost, index) => {
            return (
              <SmallPostView key={index} post={post}/>
            )
          })}
        </Main>
        <Sidebar>Sidebar</Sidebar>
      </Container>
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
