import { createGlobalStyle } from 'styled-components'
import { media } from './Utils/Constants'
import {
  BtnLinkBackground,
  DarkHeadingColor,
  DarkTextColor,
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin,
  HeaderHeight,
  HeaderHeightMobile,
  LightHeadingColor,
  LightTextColor,
  SmallMargin
} from "./Utils/Constants"

const GlobalStyle = createGlobalStyle`
  *, html, body {
    margin: 0;
    padding: 0;
    font-family: 'Rubik', sans-serif;
    font-size: 16px;
    font-weight: 300;
    font-style: normal;
    line-height: ${ GridGapLineHeightBottomMargin }px;
    border: none;
  }
  
  h1 {
    font-size: 61px;
    font-weight: 900;
    line-height: 73px;
    text-align: center;
    color: ${ DarkHeadingColor };
    margin-bottom: 73px;
    
    ${media.lessThan("medium")`
      font-size: ${ DefaultMarginAndFontSizeMobile }px;
      line-height: 46px;
    `}
  }
  
  h2 {
    font-size: ${ DefaultMarginAndFontSizeMobile }px;
    font-weight: 900;
    text-align: left;
    margin-bottom: ${ GridGapLineHeightBottomMargin }px;
    color: ${ DarkHeadingColor };
    
    ${media.lessThan("medium")`
      font-size: 25px;
      line-height: 30px;
      margin-bottom: ${ SmallMargin }px;
    `}
  }
  
  h3 {
    font-size: 20px;
    font-weight: 900;
    text-align: left;
    margin-bottom: 6px; 
    color: ${ DarkHeadingColor };
  }
  
  .light-heading {
    color: ${ LightHeadingColor };
  }
      
  p {
    text-align: left;
    color: ${ DarkTextColor };
    margin-bottom: ${ GridGapLineHeightBottomMargin }px;
    
    ${media.lessThan("medium")`
      line-height: 23px;
      margin-bottom: ${ SmallMargin }px;
    `}
  }
  
  .light-text {
    color: ${ LightTextColor };
  }
  
  a {
    text-decoration: none;
  }
  
  .nav-link-active {
    color: ${ BtnLinkBackground };
  }
  
  // Quickfix for FF's faulty anchor-scroll behavior.
  *[id]:before { 
    display: block; 
    content: " "; 
    margin-top: -${ HeaderHeight }px; 
    height: ${ HeaderHeight }px; 
    visibility: hidden; 
    
    ${media.lessThan("medium")`
      margin-top: -${ HeaderHeightMobile }px; 
      height: ${ HeaderHeightMobile }px; 
    `}
    
    //  ${media.lessThan("small")`
    //   margin-top: calc(-${ HeaderHeightMobile }px - 75px);
    //   height: calc(${ HeaderHeightMobile }px + 75px);
    // `}
  }
`

export default GlobalStyle