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
      image {
        files {
          source {
            publicURL
          }
          title
        }
      }
      video {
        id
      }
    }
    fields {
      urlPath
      source
      renderer
    }
  }
`

export function formatPostFromData(data: PostDataFragmentFragment , index: number = null): IPost {
  const fm = data.frontmatter
  const fl = data.fields
  return {
    id: data.id,
    title: fm.title,
    date: new Date(fm.date),
    desc: fm.desc,
    type: fm.type,
    urlPath: fl.urlPath,
    source: fl.source,
    renderer: fl.renderer,
    index: index,
    body: data.html
  }
}

// export function formatPostListFromData(
//   data: PostsForPageQuery | PostsForIndexPageQuery
// ): IPost[] {
//   const posts: IPost[] = data.allMarkdownRemark.edges.map(({ node }, index) => {
//     return formatPostFromData(node, index)
//   })

//   return posts
// }

// export function formatPostFromData(
//   data: PostDataFragmentFragment,
//   index: number = null
// ): IPost {
//   const fm = data.frontmatter
//   const cover = fm.cover ? fm.cover.childImageSharp.fluid : null

//   const audioUrl = fm.audio
//     ? fm.audio.publicURL
//     : fm.audioURL
//     ? fm.audioURL
//     : null

//   const wordCount = { ...data.wordCount }

//   const coverSize =
//     cover && fm.cover.childImageSharp.original
//       ? {
//           width: fm.cover.childImageSharp.original.width,
//           height: fm.cover.childImageSharp.original.height,
//         }
//       : null

//   const images = fm.images
//     ? fm.images.map(img => img.childImageSharp.fluid)
//     : null

//   const minImagesSize = fm.images
//     ? (fm.images.reduce((acc, img) => {
//         if (img.childImageSharp.original.width < acc.width) {
//           acc = { ...img.childImageSharp.original }
//         }
//         return acc
//       }, fm.images[0].childImageSharp.original) as TSize)
//     : null

//   const audio = fm.audio
//     ? {
//         title: '',
//         url: fm.audio.publicURL,
//         size: fm.audio.size,
//         prettySize: fm.audio.prettySize,
//       }
//     : null

//   const audioList = fm.audioList
//     ? fm.audioList
//         .filter(it => !!it.file)
//         .map(it => ({
//           title: it.title,
//           url: it.file.publicURL,
//           size: it.file.size,
//           prettySize: it.file.prettySize,
//         }))
//     : null

//   return {
//     indexOnPage: index,
//     excerpt: data.excerpt,
//     title: fm.title,
//     urlKey: fm.urlKey,
//     urlPath: data.fields.urlPath,
//     type: fm.type,
//     desc: fm.desc,
//     youtube: fm.youtube,
//     timeToRead: data.timeToRead,
//     date: fm.date,
//     html: data.html,
//     tags: fm.tags,
//     dateValue: parseInt(data.fields.dateValue, 10),
//     images,
//     minImagesSize,
//     cover,
//     coverSize,
//     wordCount,
//     audioUrl,
//     audio,
//     audioList,
//   }
// }
