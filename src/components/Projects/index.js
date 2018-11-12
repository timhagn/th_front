import React from 'react'
import {graphql, StaticQuery} from "gatsby"
import styled from "styled-components"
import {LargeMargin, media} from '../Utils/Constants'
import {
  DefaultMargin,
  DefaultMarginAndFontSizeMobile,
  // GridGapLineHeightBottomMargin,
  Width,
  WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile,
  WrapperMarginsMobile
} from "../Utils/Constants"
import BackgroundImage from '../Utils/BackgroundImage'
import StyledProjects from "./Projects";

/**
 * This Styled Component wraps the Project Section.
 *
 * @param className String    From styled components
 */
const ProjectsSection = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "seamless-bg-desktop.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        mobile: file(relativePath: { eq: "seamless-bg-mobile.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 640) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
     render={data => {
       // Switch Image according to size on desktop / mobile.
       const imageData = Width > 640 ?
           data.desktop.childImageSharp.fluid :
           data.mobile.childImageSharp.fluid
       return (
           <BackgroundImage id="projects"
                            Tag="section"
                            className={className}
                            fluid={imageData}
                            style={{

                            }}>
             <StyledProjectContainer>
               <h2>Projects</h2>
               <div>
               <StyledProjects />
               </div>
             </StyledProjectContainer>
           </BackgroundImage>
       )
       }
     }
    />
)

const StyledProjectContainer = styled.div`
  position: relative;
  max-width: ${ WrapperMaxWidthMobile }px;
  margin: ${ DefaultMarginAndFontSizeMobile }px ${ WrapperMarginsMobile }px;
  
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
  background-position: bottom;
  background-repeat: repeat-y !important;

  ${media.lessThan("medium")`
    background-size: contain !important;
  `}
`

export default StyledProjectsSection