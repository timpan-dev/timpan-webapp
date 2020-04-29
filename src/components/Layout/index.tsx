import React from 'react'
import { Link } from 'gatsby'

const Layout: React.FC = ({ children }) => {


  return (
    <div>
      <div>
        <Link to="/">
          <h1>ТИМПАН</h1>
        </Link>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Layout
