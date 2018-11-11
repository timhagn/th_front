import React from 'react'
import {graphql, StaticQuery} from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import media from "styled-media-query"
import {
  DefaultMargin,
  LargeMargin,
  DefaultMarginAndFontSizeMobile,
  // GridGapLineHeightBottomMargin,
  Width, WrapperMaxWidthDesktop
} from "../Utils/Constants"
import Button from "../Utils/Button";
import { getBackgroundSrc } from "../Utils/HelperFunctions"
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
              ...GatsbyImageSharpFluid
            }
          }
        }
        mobile: file(relativePath: { eq: "seamless-bg-mobile.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 640) {
              ...GatsbyImageSharpFluid
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
       // No more needed if BackgroundImage is finished : )

       // const backgroundSource = getBackgroundSrc(imageData, Width)
       // const containerBackground = {
       //   backgroundImage: `url(${ backgroundSource })`
       // }
       return (
           <BackgroundImage id="projects"
                            Tag="section"
                            className={className}
                            fluid={imageData}
                            style={{
                              backgroundPosition: `bottom`
                            }}>
             {/*<StyledProjectsBackgroundImage fluid={imageData}/>*/}
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

const StyledProjectsBackgroundImage = styled(Img)`
  img, picture > img {
    height: auto !important;
    object-fit: contain !important;
    overflow: hidden;
    box-sizing: border-box;
  }
`

const StyledProject = styled.div`
  position: relative;
  margin: 0 auto;
`

const StyledProjectContainer = styled.div`
  position: relative;
  max-width: ${ WrapperMaxWidthDesktop }px;
  margin: ${ DefaultMargin }px auto; 
  
  ${media.lessThan("medium")`
    top: ${ LargeMargin }px;
  `}
`

const StyledProjectsSection = styled(ProjectsSection)`
  position: relative;
  overflow: hidden;
  width: 100%;
  
  ${media.lessThan("medium")`
    // height: calc(${ LargeMargin }px + ${ DefaultMarginAndFontSizeMobile }px + 23px);
  `}
`

export default StyledProjectsSection