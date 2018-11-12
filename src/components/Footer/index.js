import React from 'react'
import {graphql, StaticQuery} from "gatsby"
import styled from "styled-components"
import { media } from '../Utils/Constants'
import {
  DefaultMargin,
  LargeMargin,
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin,
  Width
} from "../Utils/Constants"
import BackgroundImage from "../Utils/BackgroundImage"

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
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        mobile: file(relativePath: { eq: "seamless-bg-mobile.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 640) {
              ...GatsbyImageSharpFluid_withWebp
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

      // TODO: same as in Projects - see to it,
      // that BackgroundImage renders correctly : ).

      return (
          <BackgroundImage Tag="section"
                           className={className}
                           fluid={imageData}
                           style={{
                             backgroundPosition: `top`,
                             marginTop: `-1px`,
                           }} >
            <StyledParagraph>&copy; Tim Hagn</StyledParagraph>
          </BackgroundImage>
      )
      }
    }
    />
)

const StyledParagraph = styled.p`
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
`

const StyledCopyrightSection = styled(CopyrightSection)`
  position: relative;
  overflow: hidden;
  height: calc(${ LargeMargin }px + ${ GridGapLineHeightBottomMargin }px);
  
  ${media.lessThan("medium")`
    height: calc(${ DefaultMarginAndFontSizeMobile }px + 23px);
  `}
`

export default StyledCopyrightSection