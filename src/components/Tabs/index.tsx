import styled from 'styled-components'
import { primaryColor, brighten, darken } from '~/utils/styling'

export const TabContent = styled.div`
  width: 100%;
  margin: 0 10px;
  display: none;
  &.active {
    display: flex;
  }
`

export const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px 0;
`

export const Space = styled.div`
  flex: 1;
`

export const Tab = styled.div`
  text-align: center;
  padding: 8px 33px 4px;
  font-size: 20px;
  border-bottom: 1px solid #222;
  cursor: pointer;
  color: #222;
  &:visited { color: #222; }
  &:hover {
    color: ${ brighten('#222')};
    border-bottom: 1px solid ${ brighten('#222')};
  }
  &:active {
    color: ${ darken('#222')};
    border-bottom: 1px solid ${ darken('#222')};
  }
  &.active {
    border-bottom: 1px solid ${primaryColor};
    color: ${primaryColor};
    &:visited { color: ${primaryColor}; }
    &:hover { color: ${ brighten(primaryColor)} !important; }
    &:active { color: ${ darken(primaryColor)} !important; }
  }
`