import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import StyledHeader from './Header'

/**
 * This describes the overall layout of the portfolio Page.
 */
const Layout = ({ notFound = false, children }) => {
  // // For fCC Testing.
  // const fccScript = `
  //   (function(document, script) {
  //     const projectName = 'portfolio'
  //     localStorage.setItem('example_project', 'Personal Portfolio')
  //   }(document, 'script'))
  // `
  // // And a little smooth scrolling.
  // const smoothScroll = `
  //   (function(document) {
  //       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  //         anchor.addEventListener('click', function (e) {
  //           e.preventDefault()
  //
  //           document.querySelector(this.getAttribute('href')).scrollIntoView({
  //             behavior: 'smooth'
  //           })
  //         })
  //       })
  //   }(document))
  // `
  return (
  <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => (
          <>
            <Helmet
                title={data.site.siteMetadata.title}
                meta={[
                  {
                    name: 'description',
                    content: 'Tim Hagn - Development & Design'
                  },
                  {
                    name: 'keywords',
                    content: 'timhagn.com, th, php, js, drupal, react, javascript'
                  },
                ]}
            >
              <html lang="en"/>
            </Helmet>
            <StyledHeader notFound={notFound ? '/' : ''}/>
            {children}
          </>
      )}
  />
  )
}

export default Layout
