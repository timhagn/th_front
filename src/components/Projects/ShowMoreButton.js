import React from 'react'
import styled from 'styled-components'
import {
  DarkLinkHoverVisited,
} from '../Utils/Constants'
import { graphql, StaticQuery } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * "Loads" more projects.
 */
const ShowMore = ({ className, onClick, projectCount, children, ...other }) => (
    <StaticQuery query={graphql`
      query {
        projects: allNodeProject {
            totalCount
        }
      }
    `}
     render={ data => {
         // Hide ShowMoreButton on no more data.
         const hideButtonClass =
             projectCount >= data.projects.totalCount ? ` hide-show-more` : ``
         return (
             <button id="show-more"
                     className={`${className}${hideButtonClass}`}
                     onClick={onClick}
                     {...other}>
               show more
               <FontAwesomeIcon icon="angle-down"
                                size="lg"
                                style={{
                                  marginLeft: 13,
                                  fontSize: `2rem`,
                                  verticalAlign: `-0.725rem`,
                                }} />
             </button>
         )
       }
     }
    />
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