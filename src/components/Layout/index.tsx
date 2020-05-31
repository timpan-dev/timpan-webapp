import React, { useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import GlobalStyle from '~/components/GlobalStyle'
import AppBar from './AppBar'
import RootContainer from './RootContainer'
import ContentView from './ContentView'
import Footer from './Footer'
import AppResize from '~/components/AppResize'
import { pageWidth, primaryColor, brighten, darken, headerFontFamily } from '~/utils/styling'
import LogoUrl from '~/assets/logo.svg'
import NavBar from './NavBar'
import MenuSvg from '~/assets/menu.inline.svg'
import CloseSvg from '~/assets/close.inline.svg'
import { useAppContext } from '~/contexts/appContext'
import MenuLink from './MenuLink'
import SmallHead from '~/components/SmallHead'

const Main = styled.div`
  flex: 1;
  min-height: calc(100vh - 270px);
`

const AppBarWrapper = styled.div`
  max-width: ${pageWidth}px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
`

const Menu = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-items: space-between;
  align-items: stretch;
`

const MenuItem = styled.div`
  display: flex;
  align-items: stretch;
  margin: auto;
  padding: 5px;
`

// const MenuLink = styled(Link)`
//   text-transform: uppercase;
//   color: ${ primaryColor };
//   &:visited {
//     color: ${ primaryColor };
//   }
//   &:hover {
//     color: ${ brighten(primaryColor) };
//   }
//   &:active {
//     color: ${ darken(primaryColor) };
//   }
// `

const Separator = styled.div`
  display: flex;
  flex: 1;
`

const Ball = styled.div`
  width: 10px;
  height: 10px;
  background: ${ brighten(primaryColor, 1) };
  align-items: center;
  margin: auto;
  border-radius: 10px;
`

const Logo = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 60px;
  margin: 5px 40px;
  background: url(${LogoUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const MenuButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px;
  width: 40px;
  height: 34px;
  z-index: 10;
  @media (min-width: 640px) {
    display: none;
  }
`

const HMenu = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  font-family: ${headerFontFamily};
  width: 100%;
  align-items: center;
  flex-wrap: nowrap;
`

const HMenuItem = styled.li`
  margin-top: 2px;
  flex: 0 1 auto;
  color: ${primaryColor};
  margin-left: 1rem;
  font-size: 1rem;
  line-height: 32px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const HMenuSeporator = styled.div`
  height: 1px;
  background: #F8CB5B;
  width: 100%;
  margin: 5px 0;
  &.first {
    box-shadow: 0 2px 3px 2px rgba(57, 1, 1, .4);
  }
`

interface ILayoutProps {
  showSmallHead?: boolean
}

const Layout: React.FC<ILayoutProps> = ({ children, showSmallHead = true }) => {
  const { state, dispatch } = useAppContext()

  function onMenuClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    dispatch({ type: `TOGGLE_DRAWER` })
    e.preventDefault()
  }

  function onLogoClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    dispatch({ type: `CLOSE_DRAWER` })
    navigate("/")
  }

  useEffect(() => {
    if (state.pageWidth > 640) {
      dispatch({ type: `CLOSE_DRAWER` })
    }
  }, [state.pageWidth])

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <NavBar>
        <HMenu>
          <Logo
            onClick={onLogoClick}
            style={{ position: `relative`, left: `10px` }}
          ></Logo>
          <HMenuSeporator className="first"></HMenuSeporator>
          <HMenuItem>
            <MenuLink className="navbar" to="/">
              Главная
            </MenuLink>
          </HMenuItem>
          <HMenuSeporator></HMenuSeporator>
          <HMenuItem>
            <MenuLink className="navbar" to="/about">
              О нас
            </MenuLink>
          </HMenuItem>
          <HMenuSeporator></HMenuSeporator>
          <HMenuItem>
            <MenuLink className="navbar" to="/albums">
              Аудио
            </MenuLink>
          </HMenuItem>
          <HMenuSeporator></HMenuSeporator>
          <HMenuItem>
            <MenuLink className="navbar" to="/videos">
              Видео
            </MenuLink>
          </HMenuItem>
          <HMenuSeporator></HMenuSeporator>
          <HMenuItem>
            <MenuLink className="navbar" to="/photos">
              Фото
            </MenuLink>
          </HMenuItem>
          <HMenuSeporator></HMenuSeporator>
          <HMenuItem>
            <MenuLink className="navbar" to="/music">
              Ноты
            </MenuLink>
          </HMenuItem>
          <HMenuSeporator></HMenuSeporator>
        </HMenu>
      </NavBar>
      <RootContainer>
        <AppBar>
          <AppBarWrapper>
            <Menu>
              <MenuItem>
                <MenuLink to="/">Главная</MenuLink>
              </MenuItem>
              <Separator>
                <Ball></Ball>
              </Separator>
              <MenuItem>
                <MenuLink to="/about">О нас</MenuLink>
              </MenuItem>
              <Separator>
                <Ball></Ball>
              </Separator>
              <MenuItem>
                <MenuLink to="/albums">Аудио</MenuLink>
              </MenuItem>
            </Menu>
            <Logo onClick={() => navigate("/")}></Logo>
            <Menu>
              <MenuItem>
                <MenuLink to="/videos">Видео</MenuLink>
              </MenuItem>
              <Separator>
                <Ball></Ball>
              </Separator>
              <MenuItem>
                <MenuLink to="/photos">Фото</MenuLink>
              </MenuItem>
              <Separator>
                <Ball></Ball>
              </Separator>
              <MenuItem>
                <MenuLink to="/music">Ноты</MenuLink>
              </MenuItem>
            </Menu>
          </AppBarWrapper>
        </AppBar>
        <ContentView>
          <MenuButton onClick={onMenuClick}>
            {state.drawer ? <CloseSvg /> : <MenuSvg />}
          </MenuButton>
          {showSmallHead && <SmallHead/>}
          <Main>{children}</Main>
          <Footer />
        </ContentView>
      </RootContainer>
      <AppResize></AppResize>
    </>
  )
}

export default Layout