import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  DefaultMargin,
  HeaderHeight,
  HeaderHeightMobile,
  LargeMargin,
  Width
} from "../Utils/Constants";
import StyledWelcomeContent from './WelcomeContent'
import media from "styled-media-query"

/**
 * The Welcome Section displays the Hero Image and all content therein.
 * @param className String    From styled components
 */
const WelcomeSection = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "welcome-bg-desktop.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mobile: file(relativePath: { eq: "welcome-bg-mobile.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 640) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={ data => {
      // Switch Image according to size on desktop / mobile.
      const imageData = Width > 640 ?
          data.desktop.childImageSharp.fluid :
          data.mobile.childImageSharp.fluid
      return (
        <section className={className} id='welcome-section'>
          <StyledWelcomeBackgroundImage fluid={imageData} />
          <StyledContainer>
            <StyledWelcomeContent />
          </StyledContainer>
        </section>
      )
      }
    }
    />
)

const StyledWelcomeBackgroundImage = styled(Img)`
  position: absolute;
  left: 0;
  top: 0;
  width: auto;
  height: 100vh;
`

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding-top: calc(${ HeaderHeight }px + ${ DefaultMargin }px);
  width: 100%;
  height: 100vh;
  ${media.lessThan("medium")`
    padding-top: calc(${ HeaderHeightMobile }px + ${ LargeMargin }px);
  `}
`

const StyledWelcomeSection = styled(WelcomeSection)`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`

export default StyledWelcomeSection