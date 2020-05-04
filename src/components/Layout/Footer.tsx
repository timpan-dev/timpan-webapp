import React from "react"
import styled from "styled-components"
import { primaryColor } from "~/utils/styling"

const StyledFooter = styled.footer`
  background: ${primaryColor};
`

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <div className="fixed-width-page">
        @ TIMPAN, 2020
      </div>
    </StyledFooter>
  )
}

export default Footer
