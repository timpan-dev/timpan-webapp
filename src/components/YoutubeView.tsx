import React, { useEffect, useState, createRef, HTMLProps } from 'react'
// import styled from 'styled-components'
import Ratio from '~/components/Ratio'

interface IYoutubeView extends HTMLProps<HTMLDivElement> {
  link: string
  autoplay?: boolean
}

const YoutubeView: React.FC<IYoutubeView> = ({ link, autoplay = false, ...props }) => {
  const [showVideo, setShowVideo] = useState(false)
  const container = createRef<HTMLDivElement>()

  const id = link.match(/\/([^/]+?)$/)[1]

  useEffect(() => {
    if (window && 'IntersectionObserver' in window && container && container.current) {
      const videoObserver = new IntersectionObserver(onVideoIntersection, {
        rootMargin: '100px 0px',
        threshold: 0.25
      })
      function onVideoIntersection(entries: any) {
        if (!entries || entries.length <= 0) return
        if (entries[0].isIntersecting) {
          setShowVideo(true)
          videoObserver.disconnect()
        }
      }
      videoObserver.observe(container.current)
      return () => {
        videoObserver.disconnect()
      }
    } else {
      setShowVideo(true)
    }
  }, [container])

  return (
    <div {...props} ref={container}>
      <Ratio ratio={9 / 16} style={{ background: "black" }}>
        {showVideo ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}${autoplay ? '?autoplay=1' : ''}`}
            //@ts-ignore
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          undefined
        )}
      </Ratio>
    </div>
  )
}

export default YoutubeView