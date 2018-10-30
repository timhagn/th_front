import React from 'react'
import Link from '../Utils/Link'
import styled from 'styled-components'
import Logo from './Logo'
import Profile from './Profile'
import '../Utils/variables'
import { DarkBackground } from "../Utils/variables";

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
  min-width: 955px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  background-color: ${DarkBackground};
`

export default StyledHeader
