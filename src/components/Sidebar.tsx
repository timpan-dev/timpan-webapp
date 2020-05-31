import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import ReadMore from '~/components/ReadMore'
import Playlist from '~/components/Playlist'
import PlaylistProvider from '~/providers/PlaylistProvider'
import YoutubeView from '~/components/YoutubeView'

const SidebarDiv = styled.div`
`

interface ISidebarProps {
  videoList: {
    source: string
    title: string
  }[]
}

const VideoList = styled.div`
  margin-top: 40px;
`

const VideoItem = styled.div`
  h5 {
    /* line-height: 18px; */
    margin: 0;
  }
`

const Sidebar: React.FC<ISidebarProps> = ({ videoList }) => {
  
  return (
    <SidebarDiv>
      <Playlist height={300} />
      <ReadMore height={500}>
        <VideoList>
          {videoList.map((videoEnt, index) => {
            return <VideoItem key={index}>
                <YoutubeView link={videoEnt.source}/>
                <h4><a href={videoEnt.source}>{videoEnt.title}</a></h4>
              </VideoItem>
            })}
        </VideoList>
      </ReadMore>
    </SidebarDiv>
  )
}

const withData = (Component: React.FC<ISidebarProps>) => {
  return () => {
    const sideabrAudioListQuery = useStaticQuery(graphql`
      query sideabrAudioList {
        allFile(
          filter: { sourceInstanceName: { eq: "sidebar-audio" } }
          sort: { fields: name }
        ) {
          edges {
            node {
              sourceInstanceName
              publicURL
              size
              name
            }
          }
        }
        allSidebarVideoYaml {
          edges {
            node {
              video
              title
            }
          }
        }
      }
    `)

    const tracks = sideabrAudioListQuery.allFile.edges.map(
      (edge: any, index: number) => {
        return {
          index,
          title: edge.node.name.split(" - ")[1].trim(),
          src: edge.node.publicURL,
          filesize: edge.node.size
        }
      }
    )

    const videoList = sideabrAudioListQuery.allSidebarVideoYaml.edges.map(
      (edge: any, index: number) => {
        return {
          index,
          source: edge.node.video,
          title: edge.node.title,
        }
      }
    )
    return (
      <PlaylistProvider tracks={tracks}>
        <Component videoList={videoList}></Component>
      </PlaylistProvider>
    )
  }
}

export default withData(Sidebar)