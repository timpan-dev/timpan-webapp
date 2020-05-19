import React from 'react'
import styled from 'styled-components'
import { linesRem, secondaryColor } from '~/utils/styling'
import PlaySvg from './assets/play.inline.svg'
import PauseSvg from './assets/pause.inline.svg'


const StyledButton = styled.div`
  /* width: 22px;
  height: 22px; 
  margin-left: 0;
  display: flex;*/
  div {
    margin: auto;
    font-size: 42px;
    font-family: 'player';
  }
`

interface ToggleButtonProps {
  playing: boolean
  onClick: (v: boolean) => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ playing, onClick }) => {
  return (
    <StyledButton onClick={() => onClick(!playing)}>
      {playing ? <div className="icon-player-pause" /> : <div className="icon-player-play"/>}
    </StyledButton>
  )
}

export default React.memo(ToggleButton)