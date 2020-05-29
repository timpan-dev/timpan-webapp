import React, { useState, useCallback } from "react"
import Layout from '~/components/Layout'
import { graphql } from 'gatsby'
import SEO from '~/components/SEO'
import Gallery from "react-photo-gallery"
import { pageWidth, secondaryColor } from "~/utils/styling"
import styled from "styled-components"
import Carousel, { Modal, ModalGateway } from "react-images"

const Container = styled.div`
  width: 100%;
  max-width: ${pageWidth}px;
  margin: 40px auto 160px;
  h2 {
    /* font-size: 40px; */
    text-align: center;
    color: ${secondaryColor};
    margin: 40px 0 40px;
  }
`

interface IPhotoPageProps {
  data: any
}

const PhotoPage: React.FC<IPhotoPageProps> = ({ data }) => {
  const photos = data.allFile.edges.map((edge: any, index: number) => {
    return {
      index,
      src: edge.node.childImageSharp.fluid.src,
      width: edge.node.childImageSharp.fluid.aspectRatio,
      height: 1,
      srcSet: edge.node.childImageSharp.fluid.srcSet,
      sizes: edge.node.childImageSharp.fluid.sizes
      // aspectRatio: edge.node.childImageSharp.fluid.aspectRatio
    }
  })

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  console.log(data, photos)
  return (
    <Layout>
      <Container>
        <h2>Фотографии</h2>
        <Gallery
          targetRowHeight={200}
          photos={photos}
          onClick={openLightbox}
        ></Gallery>
      </Container>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x: any) => ({
                src: x.src,
                sizes: x.sizes,
                srcset: x.srcSet
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <SEO></SEO>
    </Layout>
  )
}

export default PhotoPage

export const query = graphql`
  query QueryPhotos {
    allFile(filter: {
        relativePath: {regex: "/photos/\\d+\\.jpg$/"},
        sourceInstanceName: {eq: "assets"}
    }, sort: {fields: name}) {
      edges {
        node {
          childImageSharp {
            fluid(maxHeight: 800, quality: 85) {
              src
              aspectRatio
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`