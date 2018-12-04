import React from 'react'
import styled from 'styled-components'
import {
  DarkLinkHoverVisited,
} from '../Utils/Constants'

/**
 * "Loads" more projects.
 */
const ShowMore = ({ className, onClick, children, ...other }) => (
    <button className={className} onClick={onClick} {...other}>
      show more
    </button>
)

const ShowMoreButton = styled(ShowMore)`
  width: 100%;
  height: 52px;
  background-color: transparent;
  color: ${ DarkLinkHoverVisited };
  border: 1px solid ${ DarkLinkHoverVisited };
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  transition: all 400ms;
  
  &:hover {
    background-color: rgba(0, 249, 199, 0.2);
    color: ${ DarkLinkHoverVisited };
  }
  
  &:focus {
    border: 2px solid ${ DarkLinkHoverVisited };
    border-radius: 20px;
  }
`

export default ShowMoreButton