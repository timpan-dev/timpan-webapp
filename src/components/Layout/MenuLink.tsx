import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { primaryColor, secondaryColor, brighten, darken } from '~/utils/styling'
import { useAppContext } from '~/contexts/appContext'

const StyledLink = styled.a`
  text-transform: uppercase;
  color: ${ secondaryColor};
  cursor: pointer;
  &:visited {
    color: ${ secondaryColor};
  }
  &:hover {
    color: ${ brighten(secondaryColor)};
  }
  &:active {
    color: ${ darken(secondaryColor)};
  }
  &.navbar {
    color: #E3AB11;
    &:visited {
      color: #E3AB11;
    }
    &:hover {
      color: ${ brighten('#E3AB11')};
    }
    &:active {
      color: ${ darken('#E3AB11')};
    }
  }
`

export interface IMenuLinkProps {
  to: string,
  className?: string
}

const MenuLink: React.FC<IMenuLinkProps> = ({ to, children, className }) => {
  const { state, dispatch } = useAppContext()
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    dispatch({type: 'CLOSE_DRAWER'})
    navigate(to)
    e.preventDefault()
  }
  return <StyledLink className={className} onClick={onClick}>{children}</StyledLink>
}

export default MenuLink