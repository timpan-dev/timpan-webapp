import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
`

const ContentView: React.FC = ({ children }) => {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  )
}

export default ContentView
