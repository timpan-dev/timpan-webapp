import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import GlobalStyle from '~/components/GlobalStyle'
import AppBar from "./AppBar"
import RootContainer from './RootContainer'
import ContentView from './ContentView'
import Footer from './Footer'
import AppResize from '~/components/AppResize'

const Main = styled.div`
  flex: 1;
`

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <RootContainer>
        <AppBar>
          <Link to="/">
            <h1>ТИМПАН</h1>
          </Link>
        </AppBar>
        <ContentView>
          <Main>{children}</Main>
          <Footer />
        </ContentView>
      </RootContainer>
      <AppResize></AppResize>
    </>
  )
}

export default Layout
