import React, { useState, useCallback } from "react"
import styled from 'styled-components'
import Layout from '~/components/Layout'
import { graphql } from 'gatsby'
import SEO from '~/components/SEO'
import { TabBar, Tab, Space, TabContent } from '~/components/Tabs'
import YoutubeView from '~/components/YoutubeView'
import YoutubePreview from "~/components/YoutubePreview"
import { pageWidth } from '~/utils/styling'
import Overlay from '~/components/Overlay'

interface IVideoEntry {
  source: string
  title: string
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  max-width: ${ pageWidth }px;
  margin: 10px auto;
  justify-content: stretch;
`

const VideoContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  overflow: hidden;
`

const VideoView = styled.div`
  flex: 1 1 100%;
  h4 {
    font-size: 16px;
    line-height: 22px;
  }
  padding: 0 10px;
  @media (min-width: 480px) {
    flex: 1 1 ${100 / 2}%;
    max-width: ${100 / 2}%;
  }

  @media (min-width: 720px) {
    flex: 1 1 ${100 / 3}%;
    max-width: ${100 / 3}%;
  }
`

const Lightbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  margin: auto;
  @media (min-width: ${640/0.8}px) {
    max-width: 80vw;
  }
  & > * {
    flex: 1 1 100%;
  }
`

interface IVideoPageProps {
  data: any
}

const VideoPage: React.FC<IVideoPageProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0)

  const clips = data.allVideoClipsYaml.edges.map((edge: any, index: number) => {
    return {
      index,
      source: edge.node.video,
      title: edge.node.title
    }
  })

  const casts = data.allVideoCastsYaml.edges.map((edge: any, index: number) => {
    return {
      index,
      source: edge.node.video,
      title: edge.node.title
    }
  })

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentVidio, setCurrentVideo] = useState<IVideoEntry | null>(null)

  const openLightbox = (video: IVideoEntry) => {
    setCurrentVideo(video)
    setModalIsOpen(true)
  }

  const closeLightbox = () => {
    setModalIsOpen(false)
    setCurrentVideo(null)
  }

  return (
    <Layout>
      <Overlay open={modalIsOpen} onClose={closeLightbox}>
        {currentVidio && (
          <Lightbox onClick={closeLightbox}>
            <YoutubeView
              link={currentVidio.source}
              autoplay={true}
            ></YoutubeView>
          </Lightbox>
        )}
      </Overlay>
      <TabBar>
        <Space></Space>
        <Tab
          className={activeTab === 0 ? "active" : null}
          onClick={() => activeTab !== 0 && setActiveTab(0)}
        >
          Клипы
        </Tab>
        <Tab
          className={activeTab === 1 ? "active" : null}
          onClick={() => activeTab !== 1 && setActiveTab(1)}
        >
          Передачи
        </Tab>
        <Space></Space>
      </TabBar>
      <Container>
        <TabContent className={activeTab === 0 ? "active" : null}>
          <VideoContainer>
            {clips.map((video: any, index: number) => {
              return (
                <VideoView
                  key={index}
                  onClick={e => {
                    e.preventDefault()
                    openLightbox(video)
                  }}
                >
                  <YoutubePreview link={video.source}></YoutubePreview>
                  <h4>
                    <a href="#">{video.title}</a>
                  </h4>
                </VideoView>
              )
            })}
          </VideoContainer>
        </TabContent>
        <TabContent className={activeTab === 1 ? "active" : null}>
          <VideoContainer>
            {casts.map((video: any, index: number) => {
              return (
                <VideoView
                  key={index}
                  onClick={e => {
                    e.preventDefault()
                    openLightbox(video)
                  }}
                >
                  <YoutubePreview link={video.source}></YoutubePreview>
                  <h4>{video.title}</h4>
                </VideoView>
              )
            })}
          </VideoContainer>
        </TabContent>
      </Container>
      <SEO></SEO>
    </Layout>
  )
}

export default VideoPage

export const query = graphql`
  query queryVideo {
    allVideoCastsYaml {
      edges {
        node {
          title
          video
        }
      }
    }
    allVideoClipsYaml {
      edges {
        node {
          title
          video
        }
      }
    }
  }
`
