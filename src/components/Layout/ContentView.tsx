import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '~/contexts/appContext'
import { appBarHeight, navBarWidth } from '~/utils/styling'

const StyledDiv = styled.div<{ drawer: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: white;
  flex: 1;
  z-index: 5;

  transform: ${ ({ drawer }) => drawer ? `translateX(-${navBarWidth}px)` : 'none'};
  transition: transform .3s cubic-bezier(1,.3,.5,.94);

  &.blur {
    filter: blur(2px);
    overflow: hidden;
  }

  &.drawer{
    &:after {
      content: "";
      position: absolute;
      width: 20px;
      background: linear-gradient(90deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,0) 30%);
      right: -20px;
      top: -${appBarHeight}px;
      bottom: 0;
    }
  }
`

const ContentView: React.FC = ({ children }) => {
  const app = useAppContext()
  return <StyledDiv
    className={app.state.drawer ? 'drawer' : ''}
    drawer={app.state.drawer}
  >{children}</StyledDiv>
}

export default ContentView