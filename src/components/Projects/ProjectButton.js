import React from 'react'
import Button from '../Utils/Button'
import PropTypes from "prop-types"
import styled from "styled-components";
import {SmallMargin} from "../Utils/Constants";

/**
 * Generates the Buttons for an individual Project.
 * @param className
 * @param projectData
 * @return {*}
 * @constructor
 */
const ProjectButtons = ({ className, projectData }) => {
  const {
    projectTitle,
    projectLink,
    projectLinkTitle,
    projectCodeLink,
    projectCodeLinkTitle,
  } = projectData
  const projectLinkButton = projectLink &&
      <StyledProjectButton to={ projectLink }
              aria-label={ projectLinkTitle ?
                  projectLinkTitle :
                  `${projectTitle} Page Link` }
              target="_blank">
        {projectLinkTitle ? projectLinkTitle : `Project Page` }
      </StyledProjectButton>
  const projectCodeLinkButton = projectCodeLink &&
      <StyledProjectButton to={ projectCodeLink }
                           aria-label={ projectCodeLinkTitle ?
                               projectCodeLinkTitle :
                               `${projectTitle} Code Link` }
                           target="_blank">
        { projectCodeLinkTitle ?
            projectCodeLinkTitle :
            `${ projectTitle }'s Code` }
      </StyledProjectButton>
  return (
      <div className={className}>
        {projectLinkButton}
        {projectCodeLinkButton}
      </div>
  )
}

ProjectButtons.propTypes = {
  projectData: PropTypes.object.isRequired,
}

export const StyledProjectButton = styled(Button)`
  font-size: 14px;
  font-weight: 500;
  margin-right: ${ SmallMargin }px;
  transition: all 400ms;
  max-height: 39px;
`

const StyledProjectButtons = styled(ProjectButtons)`
  display: flex;
  
`

export default StyledProjectButtons

