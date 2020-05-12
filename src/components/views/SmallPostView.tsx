import React from 'react'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { IPost } from '~/types'

interface ISmallPostViewProps {
  post: IPost
}

const SmallPostView: React.FC<ISmallPostViewProps> = ({ post }) => {
  return (
    <article>
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

export default SmallPostView