import React, { useEffect, useState, createRef } from 'react'
import styled from 'styled-components'
import Ratio from '~/components/Ratio'

interface IYoutubeView {
  link: string
  style?: object
  className?: string
}

const PreviewDiv = styled.div`
  position: relative;
  .icon-player-play {
    content: "";
    position: absolute;
    z-index: 100;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    color: rgba(255, 255, 255, 0.7);
    font-size: 100px;
    line-height: 100px;
    /* box-sizing: border-box;
    width: 74px;
    height: 74px;
    border-width: 37px 0px 37px 74px;
    border-color: transparent transparent transparent rgba(255, 255, 255, 0.9); */
  }
`

const YoutubeView: React.FC<IYoutubeView> = ({ link, ...props }) => {
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
    <PreviewDiv {...props} ref={container}>
      <Ratio ratio={9 / 16} style={{ background: "black" }}>
        {showVideo && (
          <img
            src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
            style={{ objectFit: `cover` }}
          />
        )}
      </Ratio>
      <div className="icon-player-play" />
    </PreviewDiv>
  )
}

export default YoutubeView