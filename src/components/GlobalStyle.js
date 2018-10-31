import { createGlobalStyle } from 'styled-components'
import './Utils/Constants'

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
    color: #BCD1DE;
    margin-bottom: 73px;
  }
`

export default GlobalStyle