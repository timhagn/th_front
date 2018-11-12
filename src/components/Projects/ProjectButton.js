import React from 'react'
import Button from '../Utils/Button'
import PropTypes from "prop-types"
import styled from "styled-components";
import {SmallMargin} from "../Utils/Constants";

/**
 * Generates the Buttons for an individual Project.
 * @param className
 * @param projectTitle
 * @param projectLink
 * @param projectLinkTitle
 * @param projectCodeLink
 * @param projectCodeLinkTitle
 * @return {*}
 * @constructor
 */
const ProjectButtons = ({ className,
                          projectTitle,
                          projectLink,
                          projectLinkTitle,
                          projectCodeLink,
                          projectCodeLinkTitle
                        }) => {
  const projectLinkButton = projectLink ?
      <StyledProjectButton to={ projectLink }
              aria-label={ projectLinkTitle ?
                  projectLinkTitle :
                  `${projectTitle} Page Link` }>
        {projectLinkTitle ? projectLinkTitle : `Project Page` }
      </StyledProjectButton> :
      ''
  const projectCodeLinkButton = projectCodeLink ?
      <StyledProjectButton to={ projectCodeLink }
              aria-label={ projectCodeLinkTitle ?
                  projectCodeLinkTitle :
                  `${projectTitle} Code Link` }>
        { projectCodeLinkTitle ?
            projectCodeLinkTitle :
            `See ${ projectTitle }'s Code` }
      </StyledProjectButton> :
      ''
  return (
      <React.Fragment className={className}>
        {projectLinkButton}
        {projectCodeLinkButton}
      </React.Fragment>
  )
}

ProjectButtons.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  projectLink: PropTypes.string.isRequired,
  projectLinkTitle: PropTypes.string,
  projectCodeLink: PropTypes.string,
  projectCodeLinkTitle: PropTypes.string,
}

const StyledProjectButton = styled(Button)`
  font-size: 14px;
  font-weight: 700;
  margin-right: ${ SmallMargin }px;
`

const StyledProjectButtons = styled(ProjectButtons)`
  display: flex;
  flex-direction: column;
`

export default StyledProjectButtons

