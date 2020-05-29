import React from 'react'
import Img from 'gatsby-image'

const View: React.FC<{ data: any }> = ({ data }) => (
  <Img
    fluid={data}
    style={{
      background: `#222`,
      maxHeight: `435px`
    }}
    imgStyle={{
      objectFit: `contain`,
      maxHeight: `435px`
    }}
  ></Img>
)

export default View