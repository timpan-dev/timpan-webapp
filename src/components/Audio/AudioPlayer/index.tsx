import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlayButton from './PlayButton'
import Scrubber from './Scrubber'
import { IAudioState, IAudioActions } from '../types'
import { primaryColor } from '~/utils/styling'
import { usePlaylistContext } from "~/contexts/playlistContext"

export interface IAudioPlayerProps {
  title?: string 
  state: IAudioState
  actions: IAudioActions
}

const Container = styled.div`
  position: relative;
  padding-top: 25px;
  border: 2px solid ${primaryColor};
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .btn {
    font-size: 20px;
  }

  .scrubber {
    position: relative;
    top: -3px;
  }

  .title {
    position: absolute;
    overflow: hidden;
    top: 5px;
    left: 12px;
    height: 21px;
    right: 0;
    font-size: 17px;
    line-height: 17px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const AudioPlayer: React.FC<IAudioPlayerProps> = ({ title, state, actions, ...props }) => {
  const plCtx = usePlaylistContext()
  const { setNextTrack, setPrevTrack, toggle } = plCtx.actions

  function onToggleClick() {
    toggle()
  }

  useEffect(() => {
    if (plCtx.state && actions && actions.play) {
      plCtx.state.playing ? actions.play() : actions.pause()
      console.log('useEffect plCtx.state.playing', plCtx.state.playing)
    }
  }, [plCtx.state.playing])

  useEffect(() => {
    if (plCtx.state.playing !== state.playing) {
      plCtx.state.playing ? actions.play() : actions.pause()
    }
  }, [state.downloadUrl])

  useEffect(() => {
    if (state.ended) {
      const { currentTrackIndex, playlist } = plCtx.state
      if (currentTrackIndex === playlist.length - 1) {
        plCtx.actions.pause()
      } else {
        plCtx.actions.setNextTrack()
      }
    }
  }, [state.ended])

  return (
    <Container {...props}>
      {title && <div className="title">{title}</div>}
      <PlayButton playing={plCtx.state.playing} onClick={onToggleClick}></PlayButton>
      <div className="btn icon-player-prev" onClick={() => setPrevTrack() }></div>
      <div className="btn icon-player-next" onClick={() => setNextTrack() }></div>
      <Scrubber
        className="scrubber"
        canplay={state.canPlay}
        playing={state.playing}
        duration={state.duration}
        position={state.position}
        onChangePosition={pos => actions.setPosition(pos)}
      ></Scrubber>
    </Container>
  )
}

export default AudioPlayer