import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Time from './Time'
import PositionLine from './PositionLine'
import { linesRem, secondaryColor } from '~/utils/styling'
import ControlLine from './ControlLine'


const Container = styled.div`
  flex: 1;
  margin-left: 12px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: justify;
`

const TimingRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const Space = styled.div`
  flex: 1;
`

const LinesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  overflow: hidden;
  background: #EAC883;
  margin-bottom: 8px;
  z-index: 1;
`

const DurationLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: #b3b3b3;
  z-index: 10;
`

interface IScrubberProps {
  duration: number
  playing: boolean
  position: number
  canplay: boolean
  onChangePosition: (p: number) => void
}

const Scrubber: React.FC<IScrubberProps> = ({ canplay, position, playing, duration, onChangePosition, ...props }) => {

  const durationRef = React.createRef<HTMLDivElement>()

  function onMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!canplay) return
    onChangePosition(Math.round(duration * (event.clientX - durationRef.current.offsetLeft) / durationRef.current.offsetWidth))
  }

  return (
    <Container {...props}>
      <TimingRow>
        <Time value={position}/>
        <Space></Space>
        <Time value={duration} />
      </TimingRow>
      <LinesContainer>
        <PositionLine duration={duration} position={position}></PositionLine>
        <ControlLine duration={duration} position={position} onChangePosition={onChangePosition}></ControlLine>
      </LinesContainer>
    </Container>
  )
}

export default React.memo(Scrubber)