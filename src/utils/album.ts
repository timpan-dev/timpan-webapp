import { graphql } from 'gatsby'
import {
  AlbumDataFragmentFragment,
  IAlbum
} from "~/types"

export const AlbumDataFragment = graphql`
  fragment AlbumDataFragment on MarkdownRemark {
    html
    frontmatter {
      id
      title
      date
      tags
      audio {
        cover {
          childImageSharp {
            fixed(width: 320, height: 320, quality: 85) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
        files {
          title
          source {
            publicURL
            base
            size
          }
        }
      }
    }
    fields {
      urlPath
      source
      renderer
    }
  }
`

export function formatAlbumFromData(data: AlbumDataFragmentFragment, index: number = null): IAlbum {
  const fm = data.frontmatter
  const fl = data.fields
  const files = fm.audio.files.map((file, trackIndex) => {
    if (!file.source) {
      console.warn('Missing source', file.title, fm.title)
      return {
        index: trackIndex,
        title: file.title,
        filesize: null,
        src: null
      }
    }
    return {
      index: trackIndex,
      title: file.title,
      filesize: file.source.size,
      src: file.source.publicURL
    }
  })
  return {
    id: fm.id,
    title: fm.title,
    date: new Date(fm.date),
    tags: fm.tags,
    urlPath: fl.urlPath,
    source: fl.source,
    renderer: fl.renderer,
    index: index,
    body: data.html,
    cover: fm.audio.cover.childImageSharp.fixed,
    files
  }
}
