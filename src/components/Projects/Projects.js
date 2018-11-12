import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import styled from 'styled-components'
import { media } from '../Utils/Constants'
import {
  // DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin
} from "../Utils/Constants";
import {stripGutenbergTags} from "../Utils/HelperFunctions";
import StyledProject from "./Project";

/**
 * Displays the Projects.
 *
 * @param className String    From styled components
 */
const Projects = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        projects: allNodeProject (limit: 3) {
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
       const defaultLink = `https://timhagn.com`,
             defaultLinkTitle = `timhagn.com`

       const projects = data.projects.edges.map((item, key) => {
         const projectData = {
           projectImageData:
               item.node.relationships.field_project_image !== null ?
               item.node.relationships.field_project_image[0]
                   .localFile.childImageSharp.fluid :
               data.dummyImage.childImageSharp.fluid,
           projectTitle: item.node.title,
           projectText: stripGutenbergTags(item.node.body.value).slice(0, 250),
           projectLink: item.node.field_project_link !== null ?
               item.node.field_project_link.uri : defaultLink,
           projectLinkTitle: item.node.field_project_link !== null ?
               item.node.field_project_link.title : '',
           projectCodeLink: item.node.field_project_git_link !== null ?
               item.node.field_project_git_link.uri : defaultLink,
           projectCodeLinkTitle: item.node.field_project_git_link !== null ?
               item.node.field_project_git_link.title : '',
         }
         return <StyledProject key={key} projectData={projectData} />
       })
       return (
           <div className={className}>
             {projects}
           </div>
       )
       }
     }
    />
)

const StyledProjects = styled(Projects)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${ GridGapLineHeightBottomMargin }px; 
  
  ${media.lessThan("medium")`
    display: block;
  `}
`

export default StyledProjects