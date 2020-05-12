import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '~/contexts/appContext'
import { navBarWidth } from '~/utils/styling'

const StyledDiv = styled.div`
  opacity: 0;
  position: fixed;
  z-index: 0;
  width: ${navBarWidth}px;
  color: #f2f2f2;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .1);
  top: 0;
  bottom: 0;
  right: 0;
  padding: 20px;
  transition: opacity .2s;
  &.drawer {
    opacity: 1;
    transition: opacity 2s;
  }
`

const NavBar: React.FC = ({ children }) => {
  const { state: { drawer } } = useAppContext()

  return (
    <StyledDiv className={drawer ? 'drawer' : ''}>
      {children}
    </StyledDiv>
  )
}

export default NavBar