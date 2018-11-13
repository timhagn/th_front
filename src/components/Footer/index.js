import React from 'react'
import styled from "styled-components"
import { media } from '../Utils/Constants'
import {
  LargeMargin,
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin,
} from "../Utils/Constants"

/**
 * This Styled Component wraps the Footer.
 *
 * @param className String    From styled components
 */
const CopyrightSection = ({ className }) => (
    <div className={className}>
      <StyledParagraph>&copy; Tim Hagn</StyledParagraph>
    </div>
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