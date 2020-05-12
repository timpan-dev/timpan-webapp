import React from "react"
import styled from "styled-components"
import { primaryColor } from "~/utils/styling"

const StyledFooter = styled.footer`
  min-height: 200px;
  background: ${primaryColor};
  text-align: center;
`

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <div className="fixed-width">
        © ТИМПАН, 2020
      </div>
    </StyledFooter>
  )
}

export default Footer
