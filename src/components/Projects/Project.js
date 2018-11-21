import React from 'react'
import PropTypes from "prop-types"
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  DefaultMarginAndFontSizeMobile,
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
        <p>{projectText}</p>
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
  p {
    min-height: 200px;
  }
  
  ${media.lessThan("medium")`
    display: block;
    margin-bottom: ${ DefaultMarginAndFontSizeMobile  }px;
    
    p {
      min-height: auto;
    }
  `}
`

export default StyledProject