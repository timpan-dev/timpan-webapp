import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { appBarHeight, primaryColor } from '~/utils/styling'
import { useAppContext } from '~/contexts/appContext'

const Wrapper = styled.div<{ fixed: boolean }>`
  height: ${({ fixed }) => (fixed ? `${appBarHeight}px` : 'auto')};
`

const Nav = styled.nav<{ fixed: boolean; drawer: boolean }>`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'relative')};
  z-index: 50;
  background: white;
  border-bottom: 1px solid ${primaryColor};
  width: 100vw;
  flex-basis: ${appBarHeight}px;
  min-height: ${appBarHeight}px;
  z-index: 20;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: baseline;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,.05);
  /* box-shadow: 0 1px 5px rgba(34,0,68,.3); */
  transform: ${({ drawer }) => (drawer ? 'translateX(-250px)' : 'none')};
  opacity: ${({ fixed }) => (fixed ? 0.95 : 1)};
  /* @media (min-width: 560px) {
    transform: ${({ drawer }) => (drawer ? 'translateX(-50vw)' : 'none')};
  } */
  top: 0;
  transition: transform .3s cubic-bezier(1,.3,.5,.94);
`

const AppBar: React.FC = ({ children }) => {
  const app = useAppContext()

  const [fixed, setFixed] = useState(false)

  function handleScroll() {
    const doc = document.documentElement
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    top > 1 ? setFixed(true) : setFixed(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <Wrapper fixed={fixed}>
      <Nav fixed={fixed} drawer={app.state.drawer}>
        {children}
      </Nav>
    </Wrapper>
  )
}

export default AppBar
