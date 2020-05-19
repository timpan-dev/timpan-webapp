
import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '~/components/Layout'
import { AlbumsForPageQuery, IAlbum } from '~/types'
import SmallAlbumView from '~/components/views/SmallAlbumView'
import { formatAlbumFromData } from '~/utils/album'
import SEO from '~/components/SEO'
import { pageWidth, primaryColor, secondaryColor, brighten, darken, gapWidth } from '~/utils/styling'

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
  width: 100%;
  margin: 0 10px;
  display: none;
  &.active {
    display: flex;
  }
`

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px 0;
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
`

interface IAlbumListTemplateProps {
  data: AlbumsForPageQuery
}

const AlbumListTemplate: React.FC<IAlbumListTemplateProps> = ({ data }) => {
  const albums = data.allMarkdownRemark.edges.map(({node}, index) => formatAlbumFromData(node, index))
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout>
      <TabBar>
        <Space></Space>
        <Tab
          className={activeTab === 0 ? "active" : null}
          onClick={() => activeTab !== 0 && setActiveTab(0)}
        >
          Альбомы
        </Tab>
        <Tab
          className={activeTab === 1 ? "active" : null}
          onClick={() => activeTab !== 1 && setActiveTab(1)}
        >
          Музыка
        </Tab>
        <Space></Space>
      </TabBar>
      <Container>
        <Main
          className={activeTab === 0 ? "active" : null}
          style={{
            flexDirection: `row`,
            flexWrap: `wrap`
          }}
        >
          {albums.map((album, index) => {
            return <SmallAlbumView album={album} key={index} />
          })}
        </Main>
        <Main className={activeTab === 1 ? "active" : null}>ToDO</Main>
      </Container>
      <SEO></SEO>
    </Layout>
  )
}

export default AlbumListTemplate

export const query = graphql`
query albumsForPage {
  allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {fields: {source: {eq: "albums"}}}
    ) {
    edges {
      node {
        ...AlbumDataFragment
      }
    }
  }
}
`


