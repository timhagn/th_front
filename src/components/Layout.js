import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import StyledHeader from './Header/index'
import StyledWelcomeSection from './Welcome/index'

const Layout = () => {
  // For fCC Testing.
  const fccScript = `
    (function(document, script) {
      const projectName = 'portfolio';
      localStorage.setItem('example_project', 'Personal Portfolio');
    }(document, 'script'))
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
              <script type="text/javascript">{fccScript}</script>
            </Helmet>
            <StyledHeader />
            <StyledWelcomeSection id="welcome-section" />
            <div
                style={{
                  margin: '0 auto',
                  maxWidth: 960,
                  padding: '0px 1.0875rem 1.45rem',
                  paddingTop: 0,
                }}
            >

            </div>
          </React.Fragment>
      )}
  />
  )
}

export default Layout
