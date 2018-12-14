import React from 'react'
import styled from "styled-components"
import {
  DarkHeadingColor,
  DarkLinkHoverVisited,
  media,
} from '../Utils/Constants'
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
    <footer className={className}>
      <StyledParagraph>
        <a className="light-text"
           href="mailto:mail@timhagn.com&subject=Question%20from%20the%20website">
          &copy; Tim Hagn
        </a>
      </StyledParagraph>
    </footer>
)

const StyledParagraph = styled.p`
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
    
  a {
    color: ${ DarkHeadingColor };
    
    &:hover {
      color: ${ DarkLinkHoverVisited };
    }
  }
  
`

const StyledCopyrightSection = styled(CopyrightSection)`
  position: relative;
  overflow: hidden;
  height: calc(${ LargeMargin }px + ${ GridGapLineHeightBottomMargin }px);
  z-index: 1000000; // cause of freeCodeCamp bundle
  
  ${media.lessThan("medium")`
    height: calc(${ DefaultMarginAndFontSizeMobile }px + 23px);
  `}
`

export default StyledCopyrightSection