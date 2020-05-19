import React from 'react'
import styled from 'styled-components'
import { headerFontFamily } from '~/utils/styling'

const Container = styled.div`
  font-family: ${headerFontFamily};
  font-size: 12px;
  color: #222;
  user-select: none;
`

interface ITimeProps {
  value?: number
}

function timeToHMS(t: number) {
  const h = Math.floor(t / 3600)
  const m = Math.floor((t - h * 3600) / 60)
  const s = Math.round(t - h * 3600 - m * 60)
  const S = s.toString().padStart(2, '0')
  const M = m.toString().padStart(2, '0')
  if (h === 0) return `${M}:${S}`
  const H = h.toString().padStart(2, '0')
  return `${H}:${M}:${S}`
}

const Time: React.FC<ITimeProps> = ({ value }) => {
  return <Container>{value ? timeToHMS(value) : '00:00'}</Container>
}

export default React.memo(Time)