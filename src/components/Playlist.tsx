import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Audio from "~/components/Audio"
import ReadMore from "~/components/ReadMore"
import { ITrack } from "~/types"
import { usePlaylistContext } from "~/contexts/playlistContext"

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
  height?: number
}

const Playlist: React.FC<IPlaylistProps> = ({
  height
}) => {
  const { state, actions } = usePlaylistContext()

  const {currentTrack, playlist} = state
  const { setCurrentTrack, play} = actions

  function onTrackClick(track: ITrack) {
    if (setCurrentTrack && track.index !== null) {
      setCurrentTrack(track.index)
      play()
    }
  }

  const playlistJsx = (
    <PlaylistDiv>
      {playlist && playlist.map((track: any, index: number) => {
        return (
          <Track
            key={index}
            onClick={() => onTrackClick(track)}
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
