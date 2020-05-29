import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery, navigate } from 'gatsby'
// import Img from 'gatsby-image'
import { pageWidth } from '~/utils/styling'
// import headImg from '~/assets/head.png'
import LogoUrl from '~/assets/logo.svg'
import LabelUrl from '~/assets/label.svg'
import { GetHeadBackgroundQuery } from '~/types'
import BackgroundImage from "gatsby-background-image"

const headHeight = 600

const Wrapper = styled.div`
  margin: auto;
  max-width: ${pageWidth}px;
  max-height: ${headHeight}px;
  height: 100%;
  width: 100%;

  .head-img {
    position: relative;
    height: 100%;
    width: 100%;
    padding-bottom: ${(headHeight / pageWidth) * 100}%; 
  }
`

const HeadDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  z-index: 10;
`

const Logo = styled.div`
  margin: ${150 / pageWidth * 100}% auto 0;
  width: ${128 / pageWidth * 100}%;
  height: ${128 / headHeight * 100}%;
  background: url(${LogoUrl});
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  padding: 1px;
  z-index: 11;
`

const Label = styled.div`
  margin: ${20 / pageWidth * 100}% auto 0;
  width: ${312.899 / pageWidth * 100}%;
  height: ${90.403 / headHeight * 100}%;
  background: url(${LabelUrl});
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  padding: 1px;
  z-index: 11;
`

const Head: React.FC = () => {

  const data: GetHeadBackgroundQuery = useStaticQuery(graphql`
    query GetHeadBackground {
      file(relativePath: { eq: "head.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 880, maxHeight: 600, quality: 85) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <Wrapper>
      <BackgroundImage
        Tag="header"
        fluid={data.file.childImageSharp.fluid}
        className="head-img"
      >
        <HeadDiv>
          <Logo onClick={() => navigate('/about')}></Logo>
          <Label onClick={() => navigate('/about')}></Label>
        </HeadDiv>
      </BackgroundImage>
    </Wrapper>
  )
}

export default Head