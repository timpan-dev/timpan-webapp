import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Audio from "~/components/Audio"
import ReadMore from "~/components/ReadMore"
import { ITrack } from "~/types"

const Container = styled.div`
  width: 100% !important;
`

const PlaylistDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 30px;
`

const Track = styled.div`
  border-bottom: 1px solid #e2aa2b;
  padding: 5px;
  &:first-child {
    border-top: 1px solid #e2aa2b;
  }
  cursor: pointer;
`

interface IPlaylistProps {
  currentTrack?: ITrack
  playlist: ITrack[]
  setCurrentTrack?: (index: number) => void
  height?: number
}

const Playlist: React.FC<IPlaylistProps> = ({
  currentTrack,
  playlist,
  setCurrentTrack,
  height
}) => {
  const playlistJsx = (
    <PlaylistDiv>
      {playlist && playlist.map((track: any, index: number) => {
        return (
          <Track
            key={index}
            onClick={
              setCurrentTrack && track.index !== null && (() => setCurrentTrack(track.index))
            }
          >
            {track.title}
          </Track>
        )
      })}
    </PlaylistDiv>
  )

  const EmptyAudio = <Audio title={null} src={null} filesize={null} />

  return (
    <Container>
      {currentTrack !== null ? <Audio {...currentTrack} /> : EmptyAudio }
      {height ? (
        <ReadMore height={height}>{playlistJsx}</ReadMore>
      ) : (
        playlistJsx
      )}
    </Container>
  )
}

export default React.memo(Playlist)
