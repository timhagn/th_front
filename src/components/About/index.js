import React from 'react'
import styled from 'styled-components'
import {
  DefaultMargin,
  DefaultMarginAndFontSizeMobile,
  WrapperMarginsMobile,
  WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile
} from "../Utils/Constants"
import StyledAboutContent from './AboutContent'
import media from "styled-media-query";

/**
 * The About Section displays the correctly positioned about content therein.
 * @param className String    From styled components
 */
const AboutSection = ({ className }) => (
    <section className={className} id="about_me">
      <StyledAboutContent />
    </section>
)

const StyledAboutSection = styled(AboutSection)`
  max-width: ${ WrapperMaxWidthDesktop }px;
  position: relative;
  margin: ${ DefaultMargin }px auto;
  
  ${media.lessThan("medium")`
    max-width: ${ WrapperMaxWidthMobile }px;
    margin: ${ DefaultMarginAndFontSizeMobile }px ${ WrapperMarginsMobile }px;
  `}
`

export default StyledAboutSection