import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import {
  media,
  WrapperMarginsMobile,
  GridGapLineHeightBottomMargin,
} from '../Utils/Constants'
import { mapProjects } from "./ProjectHelpers";

/**
 * Displays the Projects.
 *
 * @param className String    From styled components
 * @param projectsToShow
 */
const Projects = ({ className, projectsToShow = 3 }) => (
    <StaticQuery query={graphql`
      query {
        projects: allNodeProject(filter: {status: {eq: true},}
  							 sort: {fields: [sticky, changed]
                				order: DESC}) {
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
       const projects = mapProjects(data.projects, data.dummyImage, projectsToShow)
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
    grid-gap: ${ GridGapLineHeightBottomMargin }px;
  `}
`

export default StyledProjects