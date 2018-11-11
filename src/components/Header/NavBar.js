import React from 'react'
import Link from '../Utils/Link'
import styled from 'styled-components'
import media from "styled-media-query"
import {
  BtnLinkBackground,
  DarkHeadingColor,
} from "../Utils/Constants"
import { removeActive } from "../Utils/HelperFunctions"


// TODO: look into timeout...
const onClick = (e) => {
  removeActive()
  e.target.classList.add('nav-link-active')
  return true
}

const NavBar = ({ className }) => (
    <nav className={className}>
      <ul>
        <li>
          <StyledNavLink onClick={onClick} to="#about_me">
            about me
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink onClick={onClick} to="#projects">
            projects
          </StyledNavLink>
        </li>
      </ul>
    </nav>
)

const StyledNavLink = styled(Link)`
  height: 73px;
  font-weight: 700;
  text-align: left;
  color: ${ DarkHeadingColor };
  
  &:hover {
    color: ${ BtnLinkBackground };
  }
  
  ${media.lessThan("medium")`
    height: 37px;
  `}
`

const StyledNavBar = styled(NavBar)`
  flex-grow: 2;
  ul {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    li {
      list-style: none;
      padding: 0 13px;
      
      ${media.lessThan("medium")`
        padding: 0 9px 0 8px;        
      `}
    }
  }
`

export default StyledNavBar


