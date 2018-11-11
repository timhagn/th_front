import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import StyledHeader from './Header'
import StyledWelcomeSection from './Welcome'
import StyledAboutSection from "./About"
import StyledProjectsSection from "./Projects"
import StyledCopyrightSection from "./Footer"


/**
 * This describes the overall layout of the portfolio Page.
 */
const Layout = () => {
  // For fCC Testing.
  const fccScript = `
    (function(document, script) {
      const projectName = 'portfolio';
      localStorage.setItem('example_project', 'Personal Portfolio');
      
    }(document, 'script'))
  `
  // TODO: Find a better way to to this... Doesn't work in FF
  const smoothScroll = `
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
  
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
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
              <script type="text/javascript">{smoothScroll}</script>
            </Helmet>
            <StyledHeader />
            <StyledWelcomeSection />
            <StyledAboutSection />
            <StyledProjectsSection />
            <StyledCopyrightSection />
          </React.Fragment>
      )}
  />
  )
}

export default Layout
