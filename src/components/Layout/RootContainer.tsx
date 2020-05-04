import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div``

const RootContainer: React.FC = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>
}

export default RootContainer
