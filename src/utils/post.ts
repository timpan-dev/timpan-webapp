import { graphql } from 'gatsby'
import {
  PostDataFragmentFragment,
  IPost
} from "~/types"

export const PostDataFragment = graphql`
  fragment PostDataFragment on MarkdownRemark {
    id
    html
    frontmatter {
      id
      title
      date
      desc
      type
      cover {
        childImageSharp {
          fluid(maxWidth: 580, quality: 85) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      image {
        files {
          source {
            childImageSharp {
              fluid(maxWidth: 580, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          title
        }
      }
      video
    }
    fields {
      urlPath
      source
    }
  }
`

export function formatPostFromData(data: PostDataFragmentFragment , index: number = null): IPost {
  const fm = data.frontmatter
  const fl = data.fields
  
  const images = fm.image ? fm.image.files.map(file => ({
    image: file.source.childImageSharp.fluid,
    title: file.title
  })) : null

  const cover = fm.cover ? fm.cover.childImageSharp.fluid : null

  return {
    id: data.id,
    title: fm.title,
    date: new Date(fm.date),
    desc: fm.desc,
    type: fm.type,
    urlPath: fl.urlPath,
    source: fl.source,
    index: index,
    body: data.html,
    cover,
    images,
    video: fm.video
  }
}
