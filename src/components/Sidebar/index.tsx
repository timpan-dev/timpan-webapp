import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Audio from '~/components/Audio'
import ReadMore from '~/components/ReadMore'
import { usePlaylistContext } from "~/contexts/playlistContext"
import Playlist from '~/components/Playlist'
import { ITrack } from "~/types"
import PlaylistProvider from '~/providers/PlaylistProvider'

const SidebarDiv = styled.div`
`

interface ISidebarProps {
}

const Sidebar: React.FC<ISidebarProps> = () => {
  const {state, actions} = usePlaylistContext()

  console.log("Sidebar render", state, actions)

  return (
    <SidebarDiv>
      {state.currentTrack && (
        <Playlist
          currentTrack={state.currentTrack}
          playlist={state.playlist}
          setCurrentTrack={actions.setCurrentTrack}
          height={300}
        />
      )}
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
    return (
      <PlaylistProvider tracks={tracks}>
        <Component></Component>
      </PlaylistProvider>
    )
  }
}

export default withData(Sidebar)