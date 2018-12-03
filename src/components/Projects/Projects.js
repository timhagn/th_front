import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  media,
  WrapperMarginsMobile,
  // DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin, LargeMargin
} from '../Utils/Constants'
// import { stripGutenbergTags } from '../Utils/HelperFunctions'
import StyledProject from './Project'

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
              field_project_source_link {
                uri
                title
              }
              relationships {
                field_project_image {
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
        },
        dummyImage: file(relativePath: { eq: "DUMMY.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 960) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
     render={ data => {
       // const defaultLink = `https://timhagn.com`
       console.log(data.projects)

       const projects = data.projects.edges.map((item, key) => {
         const projectData = {
           projectImageData:
               item.node.relationships.field_project_image !== null ?
               item.node.relationships.field_project_image
                   .localFile.childImageSharp.fluid :
               data.dummyImage.childImageSharp.fluid,
           projectTitle: item.node.title,
           projectText: item.node.body.processed,
           projectLink: item.node.field_project_link !== null ?
               item.node.field_project_link.uri : '',
           projectLinkTitle: item.node.field_project_link !== null ?
               item.node.field_project_link.title : '',
           projectCodeLink: item.node.field_project_source_link !== null ?
               item.node.field_project_source_link.uri : '',
           projectCodeLinkTitle: item.node.field_project_source_link !== null ?
               item.node.field_project_source_link.title : '',
         }
         console.log(projectData)
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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${ GridGapLineHeightBottomMargin }px;
  
  ${media.lessThan("large")`
     margin: 0 ${ WrapperMarginsMobile }px;
  `}
  
  ${media.lessThan("medium")`
    display: block;
  `}
`

export default StyledProjects