import React from 'react'
import styled from "styled-components"

import { media } from '../Utils/Constants'
import {
  LargeMargin,
  DefaultMargin,
  DefaultMarginAndFontSizeMobile,
  WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile,
  WrapperMarginsMobile
} from "../Utils/Constants"
import StyledProjects from "./Projects";
import ShowMoreButton from "./ShowMoreButton";

/**
 * This Styled Component wraps the Project Section.
 *
 * @param className String    From styled components
 */
class ProjectsSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projectsToShow: 3,
    }
  }

  handleClick = event => {
    console.log(this.state.projectsToShow)
    this.setState({
      projectsToShow: this.state.projectsToShow + 3,
    })
  }

  render() {
    return (
        <StyledProjectsSection id="projects">
          <StyledProjectContainer>
            <h2>Projects</h2>
            <StyledLoader>
              <StyledProjects projectsToShow={this.state.projectsToShow}/>
              <ShowMoreButton onClick={this.handleClick}/>
            </StyledLoader>
          </StyledProjectContainer>
        </StyledProjectsSection>
    )
  }
}

const StyledLoader = styled.div`
  width: 100%;
`

const StyledProjectContainer = styled.div`
  //position: relative;
  max-width: ${ WrapperMaxWidthMobile }px;
  margin: ${ DefaultMarginAndFontSizeMobile }px ${ WrapperMarginsMobile }px;
  
  ${media.greaterThan("small")`
    margin: ${ DefaultMarginAndFontSizeMobile }px auto;
  `}
  
  ${media.greaterThan("medium")`
    max-width: ${ WrapperMaxWidthDesktop }px;
    margin: ${ DefaultMargin }px auto; 
    
    h2 {
      margin-bottom: ${ LargeMargin }px;
    }
  `}
`

const StyledProjectsSection = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
`

export default ProjectsSection