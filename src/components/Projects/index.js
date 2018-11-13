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

/**
 * This Styled Component wraps the Project Section.
 *
 * @param className String    From styled components
 */
const ProjectsSection = ({ className }) => (
     <section className={className} id="projects">
       <StyledProjectContainer>
         <h2>Projects</h2>
         <div>
         <StyledProjects />
         </div>
       </StyledProjectContainer>
     </section>
)

const StyledProjectContainer = styled.div`
  position: relative;
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

const StyledProjectsSection = styled(ProjectsSection)`
  position: relative;
  overflow: hidden;
  width: 100%;
`

export default StyledProjectsSection