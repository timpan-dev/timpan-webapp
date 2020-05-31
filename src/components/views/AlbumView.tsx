import React, { useState } from 'react'
import styled from 'styled-components'
import { IAlbum } from '~/types'
import BackgroundImage from 'gatsby-background-image'
import { useAppContext } from '~/contexts/appContext'
import Playlist from '~/components/Playlist'

interface IAlbumViewProps {
  album: IAlbum
}

const Container = styled.article`
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  .img {
    margin: 0 auto 30px;
    width: 100% !important;
    height: auto !important;
    padding-bottom: 100%;
  }
  @media (min-width: 480px) {
    padding: 0;
    flex-direction: row;
    align-items: flex-start;
    .img {
      margin: 0 0 30px;
    }
  }
`

const PlayerSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1;
  max-width: auto;
  width: 100%;
  @media (min-width: 480px) {
    align-items: flex-start;
    margin-right: 16px;
    max-width: 320px;
  }
`

const StyledBackground = styled(BackgroundImage)`
  &::before,
  &::after {
  }
`

const InfoSection = styled.section`
  flex: 1 1;
`

const Track = styled.div`
  border-bottom: 1px solid #E2AA2B;
  padding: 5px;
  &:first-child {
    border-top: 1px solid #E2AA2B;
  }
  cursor: pointer;
`

const AlbumView: React.FC<IAlbumViewProps> = ({ album }) => {
  const appCtx = useAppContext()
  const { pageWidth } = appCtx.state

  return (
    <Container>
      <PlayerSection>
        <StyledBackground
          style={{
            backgroundSize: `contain`
          }}
          className="img"
          fixed={album.cover}
        />
        <Playlist height={pageWidth >= 480 ? null : 300} />
      </PlayerSection>
      <InfoSection>
        <header>
          <h2>{album.title}</h2>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{ __html: album.body }} />
        </main>
      </InfoSection>
    </Container>
  )
}

export default AlbumView

  // const PlaylistJsx = <Playlist>
  //   {album.files.map((track: any, index: number) => {
  //     return (
  //       <Track key={index} onClick={() => setCurrentTrack(track)}>
  //         {track.title}
  //       </Track>
  //     )
  //   })}
  // </Playlist>

      // <PlayerSection>
      //   <StyledBackground
      //     style={{
      //       backgroundSize: `contain`
      //     }}
      //     className="img"
      //     fixed={album.cover}
      //   />
      //   <Audio 
      //     title={currentTrack.title}
      //     src={currentTrack.src}
      //     filesize={currentTrack.filesize}
      //   ></Audio>

      //   {state.pageWidth >= 480 
      //     ? PlaylistJsx 
      //     : <ReadMore height={300}>{PlaylistJsx}</ReadMore>
      //   }
      // </PlayerSection>