import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { secondaryColor } from '~/utils/styling'

const Line = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 10px;
  background: transparent;
  z-index: 11;
`

// const Circle = styled.div<{ offset: number }>`
//   position: absolute;
//   height: 5px;
//   width: 5px;
//   border-radius: 5px;
//   background: ${secondaryColor};
//   left: calc(${props => props.offset}px - 2px);
//   z-index: 100;
// `

interface IControlLineProps {
  duration: number
  position: number
  onChangePosition: (time: number) => void
}

const ControlLine: React.FC<IControlLineProps> = ({ duration, position, onChangePosition}) => {
  const lineRef = React.createRef<HTMLDivElement>()
  // const [offset, setOffset] = useState(0)
  // useEffect(() => {
  //   if (!duration) return
  //   setOffset((position / duration) * lineRef.current.offsetWidth)
  // }, [duration, position])

  function onLineMouseUpHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {

    const { x, width } = lineRef.current.getBoundingClientRect()
    onChangePosition((event.pageX - x) / width * duration)
  }

  function onLineTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const { left, width } = lineRef.current.getBoundingClientRect()
    onChangePosition((event.targetTouches[0].pageX - left) / width * duration)
    event.preventDefault()
    event.stopPropagation()
  }

  // let hold = false;
  // let rect: DOMRect

  // function onCircleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  //   console.log('onCircleMouseDown')
  //   hold = true
  //   rect = lineRef.current.getBoundingClientRect()
  //   window.addEventListener('mousemove', onCircleMouseMove)
  //   window.addEventListener('mouseup', onCircleMouseUp)
  // }

  // function onCircleMouseMove(event: MouseEvent) {
  //   if (!hold || !rect) return
  //   let newOffset = event.pageX - rect.x
  //   if (newOffset > rect.width) newOffset = rect.width
  //   if (newOffset < 0) newOffset = 0
  //   console.log('onCircleMouseMove', newOffset)
  //   setOffset(newOffset)
  // }

  // function onCircleMouseUp(event: MouseEvent) {
  //   console.log('onCircleMouseUp', offset, offset / rect.width, offset / rect.width * duration)
  //   hold = false
  //   window.removeEventListener('mousemove', onCircleMouseMove)
  //   window.removeEventListener('mouseup', onCircleMouseUp)
  //   onChangePosition(offset / rect.width * duration)
  // }

  return <Line
    ref={lineRef}
    onMouseUp={onLineMouseUpHandler}
    onTouchStart={onLineTouchStart}>
    {/* <Circle
      offset={offset}
    ></Circle> */}
  </Line>
}

export default React.memo(ControlLine)