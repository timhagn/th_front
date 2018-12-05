import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  media,
  WrapperMarginsMobile,
  // DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin,
  // LargeMargin
} from '../Utils/Constants'
// import { stripGutenbergTags } from '../Utils/HelperFunctions'
// import StyledProject from './Project'
import {mapProjects} from "../Utils/HelperFunctions";

/**
 * Displays the Projects.
 *
 * @param className String    From styled components
 * @param projectsToShow
 */
const Projects = ({ className, projectsToShow = 3 }) => (
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
              fields {
                markdownBody {
                  childMarkdownRemark {
                    html
                  }
                }
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
       // console.log(data.projects)
       const projects = mapProjects(data.projects, data.dummyImage, projectsToShow)
       // Hide ShowMoreButton on no more data (Hack).
       if (projectsToShow >= data.projects.edges.length) {
         const showMore = document.querySelector(`#show-more`)
         showMore.style.opacity = 0
         showMore.style.height = 0
       }
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
  grid-template-columns: repeat(3, 1fr);
  display: block;
  
  ${media.greaterThan("medium")`
    display: grid;
    margin: 0 ${ WrapperMarginsMobile }px;
  `}
  ${media.greaterThan("large")`
    grid-gap: ${ GridGapLineHeightBottomMargin }px;
  `}
`

export default StyledProjects