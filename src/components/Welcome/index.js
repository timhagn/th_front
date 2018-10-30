import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

const WelcomeImage = ({ className, children }) => (
    <StaticQuery query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "welcome-bg-desktop.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={ data =>
        <section className={className} id='welcome-section'>
          <StyledImage fluid={data.placeholderImage.childImageSharp.fluid} />
          <StyledContainer>
            {children}
          </StyledContainer>
        </section>
    }
    />
)

// TODO: look into cover / size (wrapper div?).
const StyledImage = styled(Img)`
  position: absolute;
  left: 0;
  top: 0;
  //width: 100vw;
  //height: auto;  
`

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`

const StyledWelcomeSection = styled(WelcomeImage)`
  width: 100vw;
  height: 100vh;
  position: relative;
`

export default StyledWelcomeSection