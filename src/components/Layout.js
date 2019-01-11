import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import SEO from './SEO'
import StyledHeader from './Header'

/**
 * This describes the overall layout of the portfolio Page.
 */
const Layout = ({ notFound = false, children, title }) => {
  return (
  <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
      render={data => (
          <>
            <SEO title={title || data.site.siteMetadata.description} keywords={[
              `timhagn.com`,
              `timhagn`,
              `th`,
              `php`,
              `js`,
              `drupal`,
              `react`,
              `javascript`
            ]} />
            <StyledHeader notFound={notFound ? '/' : ''}/>
            {children}
          </>
      )}
  />
  )
}

export default Layout
