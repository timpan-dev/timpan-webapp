import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import sizeMe from 'react-sizeme'

sizeMe.noPlaceholders = true

const Container = styled.div<{ collapsed: boolean; readmore: boolean, height: number }>`
  width: 100%;
  height: ${props => (props.collapsed ? `${props.height}px` : "auto")};
  padding-bottom: ${props => (props.collapsed || !props.readmore ? 0 : "80px")};
  position: relative;
  overflow: hidden;
  /* transition: height .5s; */
`

const More = styled.div`
  display: flex;
  justify-content: center;
  align-items: bottom;
  flex-direction: row;
  position: absolute;
  height: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  .btn {
    margin: auto;
    background: #984444;
    color: #d09232;
    padding: 7px 22px;
    border: none;
    border-radius: 50px;
    font-size: 14px;
    line-height: 1.2rem;
    /* text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2); */
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 1px 5px rgba(0, 0, 0, 0.15);
    text-transform: uppercase;
  }
`

interface IReadMoreProps {
  height: number
  size: {
    width: number
    height: number
  }
}

const ReadMore: React.FC<IReadMoreProps> = ({ height, children, size }) => {
  const [readmore, setReadmore] = useState(null)
  const [collapsed, setCollapsed] = useState(true)
  const containerRef = React.createRef<HTMLDivElement>()

  function onClickHandler() {
    setCollapsed(!collapsed)
    // if (!collapsed) {
    //   const rect = containerRef.current.getBoundingClientRect()
    //   scroll.scrollMore(-containerRef.current.scrollHeight + 134, {
    //     duration: 400,
    //     delay: 0
    //   })
    // }
  }

  useEffect(() => {
    if (window 
      && readmore === null 
      && typeof size.height === 'number' 
      && size.height > height) {
        setReadmore(true)
      }
  }, [size])

  if (!readmore) {
    return <>{children}</>
  }

  return (
    <Container collapsed={collapsed} readmore={true} height={height}>
      <div ref={containerRef}>{children}</div>
      <More className="more">
        <button className="btn" onClick={onClickHandler}>
          {collapsed ? `Еще ↓` : "Свернуть ↑"}
        </button>
      </More>
    </Container>
  )
}

export default sizeMe({ monitorHeight: true, monitorWidth: false })(ReadMore)
