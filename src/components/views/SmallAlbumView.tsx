import React from 'react'
import styled from 'styled-components'
import { Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import { IAlbum } from '~/types'
import { primaryColor } from '~/utils/styling'
import BackgroundImage from 'gatsby-background-image'

interface ISmallAlbumViewProps {
  album: IAlbum
}

const AlbumContainer = styled.article`
  flex: 1 1 calc(100% - 16px);
  width: calc(100% - 16px);
  margin: 0 auto 20px;
  display: flex;
  max-width: 320px;
  flex-direction: column;
  /* justify-content: space-between; */
  @media (min-width: 480px) {
    flex: 1 1 calc(50% - 20px);
    width: calc(50% - 20px);
    margin: 0 10px 20px;
  }

  @media (min-width: 720px) {
    flex: 1 1 calc(33% - 16px);
    width: calc(33% - 16px);
    margin: 0 8px 20px;
  }
  .img {
    width: 100%;
    height: auto;
    padding-bottom: 100%;
  }
`

const StyledBackground = styled(BackgroundImage)`
  width: 100% !important;
  height: auto !important;
  padding-bottom: 100%;
  &::before,
  &::after {
  }
`

const Cover = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  /* background: gold; */
  &:before {
    padding-bottom: 100%;
  }
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 300;
  color: black;
  text-align: left;
  max-width: 220px;
  margin: 10px 0 16px;
  line-height: 24px;
`

const TagList = styled.h5`
  font-size: 12px;
  line-height: 14px;
  font-weight: 300;
  color: black;
  max-width: 220px;
`

const Tag = styled.span`
  padding: 3px 8px;
  background: ${primaryColor};
  border-radius: 20px;
  cursor: default;
`

const SmallAlbumView: React.FC<ISmallAlbumViewProps> = ({ album }) => {
  return (
    <AlbumContainer>
      <Cover onClick={() => navigate(`/${album.urlPath}`)}>
        <StyledBackground
          style={{
            backgroundSize: `contain`
          }}
          Tag="div"
          className="img"
          fixed={album.cover}
        />
      </Cover>
      <Title><Link to={`/${album.urlPath}`}>{album.title}</Link></Title>
      <TagList><Tag>{album.tags[0]}</Tag></TagList>
    </AlbumContainer>
  )
}

export default SmallAlbumView