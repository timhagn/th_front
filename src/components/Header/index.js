import React from 'react'
import Link from '../Utils/Link'
import styled from 'styled-components'
import Logo from './Logo'
import Profile from './Profile'
import { DarkBackground } from "../Utils/Constants";
import media from "styled-media-query";

/**
 * This Styled Component wraps the Logo, the Navbar and the Profile Link.
 *
 * @param className String    From styled components
 */
const Header = ({ className }) => (
    <header className={className}>
      <StyledHeaderWrapper id="navbar">
        <Link to="/">
          <Logo />
        </Link>
        <nav></nav>
        <Link to="https://github.com/timhagn"
              id="profile-link"
              target="_blank"
              rel="noopener noreferrer">
          <Profile />
        </Link>
      </StyledHeaderWrapper>
    </header>
)

const StyledHeaderWrapper = styled.div`
  height: 104px;
  width: 955px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  ${media.lessThan("medium")`
    height: 75px;
    width: 414px;
    margin: 0 17px;
  `}
`

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  background-color: ${ DarkBackground };
`

export default StyledHeader
