// import cheerio from 'cheerio'

import StyledProject from "../Projects/Project";
import React from "react";


/**
 * Maps the projects to projectData.
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
    // console.log(projectData)
    return <StyledProject
        id={`styled-project-${key}`}
        key={`styled-project-${key}`}
        projectData={projectData} />
  })

/**
 * Strips the WordPress and Paragraph Tags from a given Drupal Node's Body.
 *
 * @param drupalText String   The given Drupal Text.
 *
 * @return String             The matched inner Text.
 */
export const stripGutenbergTags = drupalText => {
  // Use cheerio first to try getting the inner paragraph's html.
  // console.log(drupalText)
  // const gutenText = cheerio.load(drupalText)('p')
  // gutenText.find('br').replaceWith('-br-')
  // const result = gutenText.text()
  // if (result) {
  //   return result.replace('-br-', '<br>')
  // }
  // else {
    const gutenbergRegEx = /.*<p>((.|\n)*?)<\/p>.*/
    const regExResult = drupalText.match(gutenbergRegEx)

    if (Array.isArray(regExResult) && regExResult.length > 0) {
      return regExResult[1]
    }
  // }
  return ''
}

export const getMenuLinks = async () => {
  // TODO: create menu links from Drupal.
}

/**
 * Add event listener to link removing every other nav-link-active.
 */
export const removeActive = () => {
  const anchors = document.getElementsByTagName('a')
  Array.prototype.forEach
      .call(anchors, element => element.classList.remove('nav-link-active'))
}
