import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery, navigate } from 'gatsby'
import { pageWidth } from '~/utils/styling'
import LogoUrl from '~/assets/logo.svg'
import LabelUrl from '~/assets/label.svg'

const Wrapper = styled.div`
  margin: auto;
  max-width: ${pageWidth}px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  @media(min-width: 640px) {
    display: none;
  }
`

const Logo = styled.div`
  margin: 20px auto 0;
  width: 50px;
  height: 50px;
  background: url(${LogoUrl});
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  padding: 1px;
  z-index: 11;
`

const Label = styled.div`
  margin: 10px auto 0;
  width: 180px;
  height: 50px;
  background: url(${LabelUrl});
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  padding: 1px;
  z-index: 11;
`

const SmallHead: React.FC = () => {
  return (
    <Wrapper>
      <Logo onClick={() => navigate('/')}></Logo>
      <Label onClick={() => navigate('/')}></Label>
    </Wrapper>
  )
}

export default SmallHead