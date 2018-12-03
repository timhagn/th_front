import React from 'react'
import PropTypes from "prop-types"
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  DefaultMarginAndFontSizeMobile, LargeMargin,
  media,
  SmallMargin
} from '../Utils/Constants'
import StyledProjectButtons from './ProjectButton'

/**
 * Displays a single Project.
 *
 * @param className String    From styled components
 * @param projectData
 */
const Project = ({ className, projectData }) => {
  const {
    projectImageData,
    projectTitle,
    projectText,
  } = projectData;
  return (
      <article className={`project-tile ${className}`} >
        <StyledImageContainer>
          <StyledProjectImage fluid={projectImageData}/>
        </StyledImageContainer>
        <h3>{projectTitle}</h3>
        <p className="project-text-content"
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
  min-height: 180px;
`

const StyledProject = styled(Project)`
  p.project-text-content {
    min-height: 150px;
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
  margin-bottom: ${ LargeMargin }px;
  
  ${media.lessThan("medium")`
    display: block;
    margin-bottom: ${ DefaultMarginAndFontSizeMobile  }px;
    
    p.project-text-content {
      min-height: auto;
    }
  `}
`

export default StyledProject