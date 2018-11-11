import React from 'react'
import {graphql, StaticQuery} from "gatsby"
import styled from "styled-components"
import { media } from '../Utils/Constants'
import {
  DefaultMargin,
  DefaultMarginAndFontSizeMobile,
  // GridGapLineHeightBottomMargin,
  Width,
  WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile,
  WrapperMarginsMobile
} from "../Utils/Constants"
import Button from "../Utils/Button"
import BackgroundImage from '../Utils/BackgroundImage'

/**
 * This Styled Component wraps the Footer.
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
                              backgroundPosition: `bottom`
                            }}>
             <StyledProjectContainer>
               <StyledProject className="project-title">
                 <h2>Projects</h2>
                 <Button to="/">Test</Button>
               </StyledProject>
             </StyledProjectContainer>
           </BackgroundImage>
       )
       }
     }
    />
)

const StyledProject = styled.div`
  position: relative;
  margin: 0 auto;
`

const StyledProjectContainer = styled.div`
  position: relative;
  max-width: ${ WrapperMaxWidthDesktop }px;
  margin: ${ DefaultMargin }px auto; 
  
  ${media.lessThan("medium")`
    max-width: ${ WrapperMaxWidthMobile }px;
    margin: ${ DefaultMarginAndFontSizeMobile }px ${ WrapperMarginsMobile }px;
  `}
  
  
`

const StyledProjectsSection = styled(ProjectsSection)`
  position: relative;
  overflow: hidden;
  width: 100%;
`

export default StyledProjectsSection