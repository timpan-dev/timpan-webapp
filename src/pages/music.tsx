import React from 'react'
import styled from 'styled-components'
import { graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '~/components/Layout'
import { secondaryColor, pageWidth } from '~/utils/styling'
import SEO from "~/components/SEO"

interface IMusicPageProps {
  data: any
}

const Container = styled.article`
  max-width: ${ pageWidth }px;
  margin: 40px auto;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  h2 {
    text-align: center;
    color: ${secondaryColor};
    margin: 40px 0 40px;
  }
  p.page-desc {
    font-size: 21px;
    color: ${secondaryColor};
  }
`

const Article = styled.section`
  display: flex;
  flex-flow: row;
  margin: 40px 0 20px;
  @media (max-width: 420px) {
    flex-flow: column;
    margin: 0 10px 20px;
  }
`

const ImageBlock = styled.section`
  display: flex;
  width: 202px;
  border: 1px solid #843235;
`

const InfoBlock = styled.section`
  flex: 1;
  margin-left: 20px;
  h3 {
    text-align: left;
  }
  @media (max-width: 420px) {
    margin-left: 0;
    margin-top: 20px;
  }
`

const MusicPage: React.FC<IMusicPageProps> = ({data}) => {
  return (
    <Layout>
      <Container>
        <h2>Ноты</h2>

        <p className="page-desc">
          Мы рады предложить Вашему вниманию нотный сборник с избранными песенными композициями и молитвами. 
          Рекомендуется для использования в факультативных программах музыкальных и воскресных школ.</p>

        {data.allMusicFilesYaml.edges.map((edge: any, index: number) => {
          return (
            <Article key={index}>
              <ImageBlock>
                <a download href={edge.node.attachment.publicURL}>
                  <Img fixed={edge.node.cover.childImageSharp.fixed} />
                </a>
              </ImageBlock>
              <InfoBlock>
                <h3>{edge.node.title}</h3>
                <p>{edge.node.desc}</p>
                <p>
                  <Link to={edge.node.attachment.publicURL}>Скачать</Link>
                </p>
              </InfoBlock>
            </Article>
          )
        })}
      </Container>
      <SEO></SEO>
    </Layout>
  )
}

export default MusicPage

export const query = graphql`
  query queryMusicFiles {
    allMusicFilesYaml(sort: {fields: title}) {
      edges {
        node {
          title
          desc
          cover {
            childImageSharp {
              fixed(width: 200, quality: 50) {
                ...GatsbyImageSharpFixed_tracedSVG
              }
            }
          }
          attachment {
            publicURL
          }
        }
      }
    }
  }
`
