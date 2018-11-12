import Link from "./Link"
import React from "react"
import styled from "styled-components"
import {
  BtnLinkBackground,
  DarkBackground,
  DefaultMarginAndFontSizeMobile
} from "./Constants"

const BaseButton = ({ className, children, to, ...other }) => (
  <Link className={className} to={to} {...other}>
    {children}
  </Link>
)

const Button = styled(BaseButton)`
  padding: 11px;
  max-height: ${ DefaultMarginAndFontSizeMobile }px;
  background-color: ${ DarkBackground };
  color: ${ BtnLinkBackground };
  border-style: none;
  border-radius: 5px;
  
  &:hover {
    background-color: ${ BtnLinkBackground };
    color: ${ DarkBackground };  
  }
`

export default Button