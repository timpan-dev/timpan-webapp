import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import {
  primaryColor,
  headerColor,
} from '~/utils/styling'
import { useAppContext } from '~/contexts/appContext'

interface IPaginationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  next?: string
  prev?: string
  numberOfPages: number
  currentPage: number
  getPageUriByIndex?: (n: number) => string
}

const PageLink = styled(Link)`
  background: ${primaryColor};
  font-size: 20px;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.85);
  padding: 10px 20px;
  margin-right: 10px;
  &:link {
    color: rgba(255, 255, 255, 0.85);
  }
  &:visited {
    color: rgba(255, 255, 255, 0.85);
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Current = styled.span`
  background: #ddd;
  font-size: 20px;
  border-radius: 3px;
  color: ${headerColor};
  padding: 10px 20px;
  margin-right: 10px;
`

const Ellipsis = styled.span`
  font-size: 20px;
  color: ${headerColor};
  padding: 10 5px;
  margin-right: 10px;
`

const Pagination: React.FC<IPaginationProps> = ({
  numberOfPages,
  currentPage,
  getPageUriByIndex,
  children,
  ...props
}) => {
  if (numberOfPages <= 0) return null

  const { state } = useAppContext()

  const nearPageCount = state.pageWidth > 420 ? 1 : 0

  const pages = new Set([1, currentPage, numberOfPages])
  for (
    let i = currentPage - nearPageCount;
    i <= currentPage + nearPageCount;
    i++
  ) {
    if (i > 1 && i < numberOfPages) pages.add(i)
  }

  const pagesTitles: Array<string | number> = []

  let prevNum = 0
  for (const num of Array.from(pages).sort((a, b) => a - b)) {
    if (num === prevNum + 1) {
      pagesTitles.push(num)
    } else {
      pagesTitles.push('...')
      pagesTitles.push(num)
    }
    prevNum = num
  }

  const pageElems = pagesTitles
    .map((page, index) =>
      page === currentPage ? (
        <Current key={index}>{page}</Current>
      ) : page === '...' ? (
        <Ellipsis key={index}>...</Ellipsis>
      ) : (
            <PageLink key={index} to={getPageUriByIndex(page as number)}>
              {page}
            </PageLink>
          )
    )

  return (
    <div {...props}>
      {currentPage > 1 && (
        <PageLink to={getPageUriByIndex(currentPage - 1)}> ←</PageLink>
      )}
      {state.pageWidth > 360 ? pageElems : <Current>{currentPage}</Current>}
      {numberOfPages > 1 && currentPage < numberOfPages && (
        <PageLink to={getPageUriByIndex(currentPage + 1)}>→ </PageLink>
      )}
    </div>
  )
}

export default Pagination
