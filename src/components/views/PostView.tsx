import React from 'react'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { IPost } from '~/types'

interface IPostViewProps {
  post: IPost
}

const PostView: React.FC<IPostViewProps> = ({ post }) => {
  return (
    <article className="fixed-width">
      <header>
        <Link to={post.urlPath}>
          <h2>{post.title}</h2>
        </Link>
        {/* <h3>
          {format(new Date(post.date), "d MMMM, yyyy", { locale: ru })}
        </h3> */}
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </main>
    </article>
  )
}

export default PostView