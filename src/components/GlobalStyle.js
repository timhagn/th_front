import { createGlobalStyle } from 'styled-components'
import media from "styled-media-query";
import './Utils/Constants'
import { DarkHeadingColor, LightHeadingColor } from "./Utils/Constants";

const GlobalStyle = createGlobalStyle`
  *, html, body {
    margin: 0;
    padding: 0;
    font-family: 'Rubik', sans-serif;
  }
  
  h1 {
    font-size: 61px;
    font-style: normal;
    font-weight: 900;
    line-height: 73px;
    text-align: center;
    color: ${ DarkHeadingColor };
    margin-bottom: 73px;
    
    ${media.lessThan("medium")`
      font-size: 39px;
      line-height: 46px;
    `}
  }
  
  h2 {
    font-size: 39px;
    font-style: normal;
    font-weight: 900;
    line-height: 26px;
    text-align: left;
    margin-bottom: 26px;
    color: ${ DarkHeadingColor };
    
    .light {
      color: ${ LightHeadingColor };
    }
    
    ${media.lessThan("medium")`
      font-size: 25px;
      line-height: 30px;
      margin-bottom: 17px;
    `}
  }
  
  h3 {
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 26px;
    text-align: left;
    margin-bottom: 6px; 
    color: ${ DarkHeadingColor };
    
    .light {
      color: ${ LightHeadingColor };
    }  
  }
`

export default GlobalStyle