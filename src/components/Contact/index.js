import React from 'react'
import styled from "styled-components"
import {
  DefaultMargin, LightTextColor,
  media,
  WrapperMarginsMobile, WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile,
} from '../Utils/Constants'
import {
  LargeMargin,
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin,
} from "../Utils/Constants"

/**
 * This Styled Component wraps the Contact Form.
 *
 * @param className String    From styled components
 */
const ContactSection = ({ className }) => (
  <section className={className}>
    <StyledContactWrapper>
      &copy; Tim Hagn
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
  min-height: 15rem;
  background-color: #fff;
`

export default StyledContactSection