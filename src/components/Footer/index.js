import React from 'react'
import {graphql, StaticQuery} from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import media from "styled-media-query"
import {
  DefaultMargin,
  LargeMargin,
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin,
  Width
} from "../Utils/Constants"

/**
 * This Styled Component wraps the Footer.
 *
 * @param className String    From styled components
 */
const CopyrightSection = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "seamless-bg-desktop.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mobile: file(relativePath: { eq: "seamless-bg-mobile.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 640) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      // Switch Image according to size on desktop / mobile.
      const imageData = Width > 640 ?
          data.desktop.childImageSharp.fluid :
          data.mobile.childImageSharp.fluid
      return (
          <footer className={className}>
            <StyledCopyrightBackgroundImage fluid={imageData} />
            <StyledParagraph>&copy; Tim Hagn</StyledParagraph>
          </footer>
      )
      }
    }
    />
)

const StyledCopyrightBackgroundImage = styled(Img)`
  position: absolute;
  left: 0;
  top: 0;
`

const StyledParagraph = styled.p`
  position: absolute;
  top: ${ DefaultMargin * 2 }px;
  margin-top: -${ DefaultMargin }px;  
  width: 100%;
  text-align: center;
  
  ${media.lessThan("medium")`
    top: ${ LargeMargin * 2 }px;
    margin-top: -${ LargeMargin }px;
  `}
`

const StyledCopyrightSection = styled(CopyrightSection)`
  position: relative;
  overflow: hidden;
  height: calc(${ DefaultMargin }px * 2 + ${ GridGapLineHeightBottomMargin }px);
  
  ${media.lessThan("medium")`
    height: calc(${ LargeMargin }px + ${ DefaultMarginAndFontSizeMobile }px + 23px);
  `}
`

export default StyledCopyrightSection