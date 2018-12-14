import React from 'react'
import StyledProject from './Project'

/**
 * Maps the projectData to projects.
 * @param projects
 * @param dummyImage
 * @param projectsToShow
 */
export const mapProjects = (projects, dummyImage, projectsToShow = 3) =>
  projects.edges.slice(0, projectsToShow).map((item, key) => {
    const projectData = {
      projectImageData:
        item.node.relationships.field_project_image !== null ?
          item.node.relationships.field_project_image
            .localFile.childImageSharp.fluid :
          dummyImage.childImageSharp.fluid,
      projectTitle: item.node.title,
      projectText: item.node.fields.markdownBody.childMarkdownRemark.html,
      projectLink: item.node.field_project_link !== null ?
        item.node.field_project_link.uri : '',
      projectLinkTitle: item.node.field_project_link !== null ?
        item.node.field_project_link.title : '',
      projectCodeLink: item.node.field_project_source_link !== null ?
        item.node.field_project_source_link.uri : '',
      projectCodeLinkTitle: item.node.field_project_source_link !== null ?
        item.node.field_project_source_link.title : '',
    }
    return <StyledProject
      id={`styled-project-${key}`}
      key={`styled-project-${key}`}
      projectData={projectData} />
  })