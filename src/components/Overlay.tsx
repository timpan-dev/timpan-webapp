import styled from 'styled-components'
import React, {
  CSSProperties,
  HTMLProps,
  ReactNode,
  useRef,
  useEffect
} from 'react'
import Portal from '~/components/Portal'

const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  z-index: 999;
  background: rgba(0,0,0,.5);
  -webkit-overflow-scrolling: touch;
`

const CloseDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px;
  width: 40px;
  height: 34px;
  z-index: 10;
`

export interface IOverlayProps extends HTMLProps<HTMLDivElement> {
  open: boolean
  defaultPortalStyles?: CSSProperties | any
  portal?: HTMLElement | null
  closeOnClick?: boolean
  closeOnEsc?: boolean
  onClose?(): void
  children?: ReactNode
}

function lockScroll(state: boolean) {
  if (typeof document === "undefined") {
    return
  }
  document.documentElement.style.overflow = state ? "hidden" : ""
}

const Overlay: React.FC<IOverlayProps> = ({
  open,
  portal,
  closeOnClick = true,
  closeOnEsc = true,
  onClose = () => null,
  children
}) => {
  lockScroll(open)

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeOnEsc && onClose()
      }
    }

    document.addEventListener('keydown', onEsc)

    return () => {
      document.removeEventListener('keydown', onEsc)
    }
  }, [closeOnEsc])

  function onOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (closeOnClick) {
      e.preventDefault()
      if (e.target === e.currentTarget) {
        onClose()
      }
    }
  }

  return (
    <Portal node={portal}>
      {open && (
        <OverlayDiv onClick={onOverlayClick}>
          {children}
          <CloseDiv onClick={onClose}>
            <svg width="26" height="20" xmlns="http://www.w3.org/2000/svg">
              <g
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="square"
                stroke="#FFF"
                stroke-width="2"
              >
                <path d="M4.474 18.526L21.526 1.474M4.474 1.474l17.052 17.052" />
              </g>
            </svg>
          </CloseDiv>
        </OverlayDiv>
      )}
    </Portal>
  )
}

export default Overlay