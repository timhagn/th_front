import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { media } from '../Utils/Constants'
import {
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin
} from "../Utils/Constants";
import { stripGutenbergTags } from "../Utils/HelperFunctions"

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
          relationships {
            field_additional_image {
              localFile {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 960) {
                    ...GatsbyImageSharpFluid
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
       const strippedText = stripGutenbergTags(data.aboutNode.field_body.value)
       const aboutImageData = data.aboutNode.relationships
           .field_additional_image.localFile.childImageSharp.fluid
       return (
             <div className={className}>
               <article>
                 <h2 className="light-heading">{title}</h2>
                 <p className="light-text">
                   {strippedText}
                 </p>
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
  ${media.lessThan("medium")`
     margin-top: ${ DefaultMarginAndFontSizeMobile }px;
  `}
`

const StyledAboutContent = styled(AboutContent)`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: ${ GridGapLineHeightBottomMargin }px; 
  
  ${media.lessThan("medium")`
    display: block;
  `}
`

export default StyledAboutContent