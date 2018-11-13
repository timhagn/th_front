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
import { media } from '../Utils/Constants'

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
  position: relative;
  max-width: ${ WrapperMaxWidthMobile }px;
  margin: ${ DefaultMarginAndFontSizeMobile }px ${ WrapperMarginsMobile }px;
  
  ${media.greaterThan("small")`
    margin: ${ DefaultMarginAndFontSizeMobile }px auto;
  `}
  
  ${media.greaterThan("medium")`
    max-width: ${ WrapperMaxWidthDesktop }px;
    margin: ${ DefaultMargin }px auto;
  `}
`

export default StyledAboutSection