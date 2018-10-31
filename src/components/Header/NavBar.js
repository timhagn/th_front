import React from 'react'
import Link from '../Utils/Link'
import styled from 'styled-components'
import media from "styled-media-query"
import {
  DarkBackground,
  WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile
} from "../Utils/Constants"

const NavBar = ({ className }) => (
    <nav className={className}>
      <ul>
        <li>
          <StyledNavLink to="#about_me">
            about me
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="#projects">
            projects
          </StyledNavLink>
        </li>
      </ul>
    </nav>
)

const StyledNavLink = styled(Link)`
  height: 37px;
`

const StyledNavBar = styled(NavBar)`
  flex-grow: 2;
  ul {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    
    li {
      list-style: none;
      padding: 0 9px 0 8px;
    }
  }
`

export default StyledNavBar


