import React from 'react'
import styled from 'styled-components'
import { secondaryColor } from '~/utils/styling'

const Line = styled.div<{ width: number }>`
  position: absolute;
  width: ${(props) => props.width}%;
  top: 0;
  left: 0;
  height: 10px;
  background: ${secondaryColor};
  z-index: 11;
`

interface IPositionLineProps {
  duration: number
  position: number
}

const PositionLine: React.FC<IPositionLineProps> = ({ duration, position }) => {
  const width = duration ? (position / duration) * 100 : 0
  return <Line width={width}></Line>
}

export default React.memo(PositionLine)