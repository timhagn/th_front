import React from 'react'
import PropTypes from "prop-types"
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  DefaultMarginAndFontSizeMobile,
  // GridGapLineHeightBottomMargin,
  LargeMargin,
  media,
  SmallMargin
} from '../Utils/Constants'
import StyledProjectButtons from './ProjectButton'

/**
 * Displays a single Project.
 *
 * @param className String    From styled components
 * @param id
 * @param projectData
 */
const Project = ({ className, id, projectData }) => {
  const {
    projectImageData,
    projectTitle,
    projectText,
  } = projectData;
  // console.log(id)
  return (
      <article id={id} className={`project-tile ${className}`} >
        <StyledImageContainer>
          <StyledProjectImage fluid={projectImageData}/>
        </StyledImageContainer>
        <h3>{projectTitle}</h3>
        <div className="project-text-content"
             dangerouslySetInnerHTML={{
              __html: projectText,
             }} />
        <StyledProjectButtons projectData={projectData} />
      </article>
  )
}

Project.propTypes = {
  projectData: PropTypes.object.isRequired,
}

const StyledProjectImage = styled(Img)`
  width: 100%;
  height: auto;
`

const StyledImageContainer = styled.div`
  margin-bottom: ${ SmallMargin }px;

`

const StyledProject = styled(Project)`
  display: grid;
  grid-template-rows: 0 200px max-content 1fr 0.3fr;
  //minmax(auto, max-content) 58px minmax(min-content, auto) minmax(auto, min-content);
  margin-bottom: ${ LargeMargin }px;
  
  h3 {
    margin-bottom: ${ SmallMargin }px;
    height: 2em;
  }
  
  .project-text-content {
    margin-bottom: ${ SmallMargin }px;

    p {
      margin-bottom: 0;
    }
    
    a {
      font-weight: 500;
      color: #07D8AE;
      transition: all 400ms;
      &:hover {
        color: #00f9c7;
      }
      &:visited {
        color: #00f9c7;
      }
    }
  }  
  
  ${media.lessThan("medium")`
    display: block;
    margin-bottom: ${ DefaultMarginAndFontSizeMobile }px;
    
    p.project-text-content {
      min-height: auto;
    }
  `}
`

export default StyledProject