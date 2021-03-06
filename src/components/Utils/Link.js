import React from 'react'
import { Link as GatsbyLink } from "gatsby"

const Link = ({ children, to, ...other }) => {
  // This assumes that any internal link (intended for Gatsby) will start
  // with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
        <GatsbyLink to={to} {...other}>
          {children}
        </GatsbyLink>
    )
  }
  return (
      <a href={to} rel="noopener noreferrer" {...other}>
        {children}
      </a>
  )
}

export default Link