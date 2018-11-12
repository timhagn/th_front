import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {media, SmallMargin} from '../Utils/Constants'
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
      <article className={`${className} project-title`} >
        <StyledProjectImage fluid={projectImageData}/>
        <h3>{projectTitle}</h3>
        <p>{projectText}</p>
        <StyledProjectButtons props={projectData} />
      </article>
  )
}

const StyledProjectImage = styled(Img)`
  width: 100%;
  height: auto;
`

const StyledProject = styled(Project)`
  display: grid;
  grid-template-rows: 2fr 1fr 1fr 1fr;
  grid-gap: ${ SmallMargin }px; 
  
  ${media.lessThan("medium")`
    display: block;
  `}
`

export default StyledProject