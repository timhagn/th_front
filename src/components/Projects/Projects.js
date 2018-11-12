import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { media } from '../Utils/Constants'
import {
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin
} from "../Utils/Constants";

/**
 * Displays the Projects.
 *
 * @param className String    From styled components
 */
const Projects = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        projects: allNodeProject {
          edges {
            node {
              id
              title
              promote
              sticky
              body {
                value
                format
                processed
                summary
              }
              field_project_link {
                uri
                title
              }
              field_project_git_link {
                uri
                title
              }
              relationships {
                field_project_image {
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
        },
        dummyImage: file(relativePath: { eq: "DUMMY.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
     render={ data => {
       console.log(data)
       const title = `test`//data.aboutNode.title
       const strippedText = `texttest`//stripGutenbergTags(data.aboutNode.field_body.value)
       // const aboutImageData = data.aboutNode.relationships
       //     .field_additional_image.localFile.childImageSharp.fluid
       return (
           <div className={className}>
             <article>
               <h2 className="light-heading">{title}</h2>
               <p className="light-text">
                 {strippedText}
               </p>
             </article>
             {/*<StyledAboutImage fluid={aboutImageData}/>*/}
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

const StyledProjects = styled(Projects)`
  display: grid;
  grid-template-columns: 3fr;
  grid-gap: ${ GridGapLineHeightBottomMargin }px; 
  
  ${media.lessThan("medium")`
    display: block;
  `}
`

export default StyledProjects