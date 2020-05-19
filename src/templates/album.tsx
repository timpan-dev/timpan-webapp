
import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import Layout from '~/components/Layout'
import { AlbumByUrlPathQuery, IAlbum } from '~/types'
import { formatAlbumFromData } from '~/utils/album'
import AlbumView from '~/components/views/AlbumView'
import SEO from '~/components/SEO'
import PlaylistProvider from '~/providers/PlaylistProvider'
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
  margin: 0 5px;
`

interface IAlbumTemplateProps {
  data: AlbumByUrlPathQuery
}

const AlbumTemplate: React.FC<IAlbumTemplateProps> = ({ data }) => {
  const album = formatAlbumFromData(data.markdownRemark)

  return (
    <Layout>
      <Container>
        <Main>
          <PlaylistProvider tracks={album.files}>
            <AlbumView album={album}></AlbumView>
          </PlaylistProvider>
        </Main>
      </Container>
      <SEO></SEO>
    </Layout>
  )
}

export default AlbumTemplate

export const query = graphql`
  query albumByURLPath($urlPath: String!) {
    markdownRemark(fields: { urlPath: { eq: $urlPath } }) {
      ...AlbumDataFragment
    }
  }
`
