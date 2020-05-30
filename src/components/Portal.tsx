import React, { useEffect, HTMLProps } from "react"
import ReactDOM from "react-dom"

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

interface IReactPortalProps extends HTMLProps<HTMLDivElement> {
  node: HTMLElement
}

function createDefaultNode() {
  const defaultNode = document.createElement("div")
  document.body.appendChild(defaultNode)
  return defaultNode
}

const Portal: React.FC<IReactPortalProps> = ({ node, children }) => {
  if (!canUseDOM) {
    return null
  }

  const defaultNode = node ? null : createDefaultNode()

  useEffect(() => {
    return () => {
      if (defaultNode) {
        document.body.removeChild(defaultNode)
      }
    }
  }, [node])

  return ReactDOM.createPortal(children, defaultNode)
}

export default Portal
