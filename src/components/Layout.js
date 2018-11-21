import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import StyledHeader from './Header'

/**
 * This describes the overall layout of the portfolio Page.
 */
const Layout = ({ notFound = false, children }) => {
  // For fCC Testing.
  const fccScript = `
    (function(document, script) {
      const projectName = 'portfolio'
      localStorage.setItem('example_project', 'Personal Portfolio')
      
    }(document, 'script'))
  `
  // And a little smooth scrolling.
  const smoothScroll = `
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        console.log('why?')
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  `
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
          <React.Fragment>
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
              <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
              <script dangerouslySetInnerHTML={{
                __html: fccScript,
              }} />
              <script dangerouslySetInnerHTML={{
                __html: smoothScroll,
              }} />
            </Helmet>
            <StyledHeader notFound={notFound ? '/' : ''}/>
            {children}
          </React.Fragment>
      )}
  />
  )
}

export default Layout
