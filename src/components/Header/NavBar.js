import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import Link from '../Utils/Link'
import styled from 'styled-components'
import { media } from '../Utils/Constants'
import {
  BtnLinkBackground,
  DarkHeadingColor,
} from '../Utils/Constants'
import { removeActive } from '../Utils/HelperFunctions'


// TODO: look into timeout...
const onClick = (e) => {
  removeActive()
  e.target.classList.add('nav-link-active')
  return true
}

/**
 * This component queries Drupal for the portfolio-menu and displays the links.
 *
 * @param className
 * @param prefix
 * @return {*}
 * @constructor
 */
const NavBar = ({ className, prefix = '' }) => (
    <StaticQuery query={graphql`
      query {
        Drupal {
          portfolioMenu: menuByName(name: "portfolio-menu") {
            name
            description
            links {
              description
              expanded
              label
              url {
                routed
                path
              }
            }
          }

        }
      }
    `}
    render={ data => {
      const menuLinks = data.Drupal.portfolioMenu.links.map((link, index) => (
          <li key={`menu-lin-${index}`}>
            <StyledNavLink onClick={onClick} to={`${prefix}${link.url.path}`}>
              {link.label}
            </StyledNavLink>
          </li>
      ))
      return(
        <nav className={className}>
          <ul>
            {menuLinks}
          </ul>
        </nav>
      )
      }
    }
    />
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


