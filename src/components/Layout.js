import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import StyledHeader from './Header/index'
import StyledWelcomeSection from './Welcome/index'
import StyledAboutSection from './About/index'
import Link from './Utils/Link'

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
            <StyledAboutSection id="about_me" />
            <section id="projects">
              <div className="project-title">
                <Link to="/">Test</Link>
              </div>
            </section>
          </React.Fragment>
      )}
  />
  )
}

export default Layout
