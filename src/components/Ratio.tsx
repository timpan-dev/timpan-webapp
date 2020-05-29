import React from 'react'
import styled from 'styled-components'
// import { contentWidth, height16x9 } from '~/utils/styling'

const Wrapper = styled.div<{ ratio: number }>`
  position: relative;
  width: 100%;
  &::before {
    content: '';
    display: block;
    padding-bottom: ${props => props.ratio * 100}%;
  }

  & > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`

interface IRatioProps {
  ratio: number
  style?: object
}

const Ratio: React.FC<IRatioProps> = ({
  children,
  ...props
}) => <Wrapper {...props}>{children}</Wrapper>

export default Ratio