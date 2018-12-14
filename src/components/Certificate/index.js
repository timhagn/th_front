import React from 'react'
import styled from "styled-components"
import {
  DefaultMargin, LightTextColor,
  media,
  WrapperMarginsMobile,
  WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile,
  DefaultMarginAndFontSizeMobile,
} from '../Utils/Constants'
import CertificateSlider from './CertificateSlider'

/**
 * This Styled Component wraps the Contact Form.
 *
 * @param className String    From styled components
 */
const ContactSection = ({ className }) => (
  <section id="certificates" className={className}>
    <StyledContactWrapper>
      <CertificateSlider />
    </StyledContactWrapper>
  </section>
)

const StyledContactWrapper = styled.div`
  position: relative;
  max-width: ${ WrapperMaxWidthMobile }px;
  margin: ${ DefaultMarginAndFontSizeMobile }px ${ WrapperMarginsMobile }px;
  color: ${ LightTextColor };
  
  ${media.greaterThan("small")`
    margin: ${ DefaultMarginAndFontSizeMobile }px auto;
  `}
  
  ${media.greaterThan("medium")`
    max-width: ${ WrapperMaxWidthDesktop }px;
    margin: ${ DefaultMargin }px auto;
  `}
`

const StyledContactSection = styled(ContactSection)`
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  margin-bottom: ${ DefaultMarginAndFontSizeMobile }px;
  
  ${media.greaterThan("small")`
    margin-bottom: ${ DefaultMarginAndFontSizeMobile }px;
  `}
  
  ${media.greaterThan("medium")`
    margin-bottom: ${ DefaultMargin }px;
  `}  
`

export default StyledContactSection