import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  media,
  GridGapLineHeightBottomMargin,
  WrapperMarginsMobile,
  DefaultMargin,
  LargeMargin,
  Width, WrapperMaxWidthDesktop
} from "../Utils/Constants"

/**
 * The Welcome Content displays the children of the Welcome Screen.
 *
 * @param className String    From styled components
 */
const WelcomeContent = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        welcomeNode: nodeBasicContent(
          title: { eq: "Welcome Title" }
        ) {
          id
          title
          field_body {
            value
            format
          }
        }
        desktop: file(relativePath: { eq: "welcome-ge-desktop.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        mobile: file(relativePath: { eq: "welcome-ge-mobile.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 640) {
              ...GatsbyImageSharpFluid_withWebp
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
       const strippedText = data.welcomeNode.field_body.value
       return (
             <div className={className}>
               <h1>{strippedText}</h1>
               <StyledWelcomeImage fluid={imageData}/>
             </div>
         )
       }
     }
    />
)

const StyledWelcomeImage = styled(Img)`
  width: 50%;
  height: auto;
  ${media.greaterThan("large")`
    width: 30%;
  `}
`

const StyledWelcomeContent = styled(WelcomeContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: ${ GridGapLineHeightBottomMargin }px ${ WrapperMarginsMobile }px 0;
  
  h1 {
    max-width: ${ WrapperMaxWidthDesktop }px;
  }
  
  ${media.greaterThan("medium")`
    margin-top: calc(${ DefaultMargin } + 104px);
  `}
  
  ${media.greaterThan("small")`
    margin: calc(${ LargeMargin }px + 75px) ${ WrapperMarginsMobile }px 0;
  `}
  
  ${media.greaterThan("321px")`
    margin: ${ LargeMargin }px ${ WrapperMarginsMobile }px 0;
  `}
`

export default StyledWelcomeContent