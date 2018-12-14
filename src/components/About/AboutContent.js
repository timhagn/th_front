import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  media,
  WrapperMarginsMobile,
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin
} from '../Utils/Constants'
import TechnologySlider from "./TechnologySlider";

/**
 * The About Content displays the children of the About Screen.
 *
 * @param className String    From styled components
 */
const AboutContent = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        aboutNode: nodeBasicContent(title: {eq: "About Me"}) {
          title
          field_body {
            value
            format
            processed
          }
          fields {
            markdownBody {
              childMarkdownRemark {
                html
              }
            }
          }
          relationships {
            field_additional_image {
              localFile {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 960) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `}
     render={ data => {
       const title = data.aboutNode.title
       const strippedText = data.aboutNode.fields
           .markdownBody.childMarkdownRemark.html
       const aboutImageData = data.aboutNode.relationships
           .field_additional_image.localFile.childImageSharp.fluid
       return (
             <div className={className}>
               <article>
                 <h2 className="light-heading">{title}</h2>
                 <div className="light-text" dangerouslySetInnerHTML={{
                   __html: strippedText,
                 }} />
                 <TechnologySlider />
               </article>
               <StyledAboutImage fluid={aboutImageData}/>
             </div>
         )
       }
     }
    />
)

const StyledAboutImage = styled(Img)`
  width: 100%;
  height: auto;
  
  img {
    object-fit: contain !important;
  }
  
  ${media.lessThan("medium")`
     margin-top: ${ DefaultMarginAndFontSizeMobile }px;
  `}
`

const StyledAboutContent = styled(AboutContent)`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: ${ GridGapLineHeightBottomMargin }px; 
  
  ${media.lessThan("large")`
     margin: 0 ${ WrapperMarginsMobile }px;
  `}
  
  ${media.lessThan("medium")`
    display: block;
  `}
`

export default StyledAboutContent