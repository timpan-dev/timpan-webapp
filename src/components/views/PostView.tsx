import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link, navigate } from 'gatsby'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { IPost } from '~/types'
import Carousel from "react-images"
import View from '~/components/ImageView'

const Article = styled.article`
  h5 {
    font-size: 15px;
    color: #aaa;
    font-weight: bold;
    font-style: italic;
    line-height: 20px;
    margin: 20px 0 20px;
  }
`

interface IPostViewProps {
  post: IPost
}

const PostView: React.FC<IPostViewProps> = ({ post }) => {
  let coverJsx = null
  let imagesJsx = null
  if (post.type === 'cover' && post.cover) {
    coverJsx = <div style={{ margin: '0 0 20px' }}>
      <Img fluid={post.cover}></Img>
    </div>
  }

  if (post.type === 'image' && post.images) {
    imagesJsx = <div style={{ margin: '0 0 20px' }}>
      <Carousel
        components={{ Footer: null, View }}
        views={post.images.map((image) => ({
          ...image.image,
          title: image.title
        }))}
      />
    </div>
  }
  return (
    <Article>
      {coverJsx}
      {imagesJsx}
      <header>
        <h2>{post.title}</h2>
        <h5>
          {format(new Date(post.date), "d MMMM, yyyy", { locale: ru })}
        </h5>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </main>
    </Article>
  )
}

export default PostView