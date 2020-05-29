import React from 'react'
import styled from 'styled-components'
import { Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { IPost } from '~/types'
import { primaryColor } from '~/utils/styling'
import Carousel from "react-images"
import View from '~/components/ImageView'

interface ISmallPostViewProps {
  post: IPost
}

const Article = styled.article`
  margin-bottom: 80px;
  h5 {
    font-size: 15px;
    color: #aaa;
    font-weight: bold;
    font-style: italic;
    line-height: 20px;
    margin: 20px 0 20px;
  }
  .readmore {
    text-transform: uppercase;
  }
`

const SmallPostView: React.FC<ISmallPostViewProps> = ({ post }) => {
  let coverJsx = null
  let imagesJsx = null
  if (post.type === 'cover' && post.cover) {
    coverJsx = <div onClick={() => navigate(post.urlPath)} style={{margin: '0 0 20px'}}>
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
        <Link to={post.urlPath}>
          <h2>{post.title}</h2>
        </Link>
        <h5>
          {format(new Date(post.date), "d MMMM, yyyy", { locale: ru })}
        </h5>
      </header>
      <main>
        <p>{post.desc}</p>
      </main>
      <Link className="readmore" to={post.urlPath}>Читать далее →</Link>
    </Article>
  )
}

export default SmallPostView