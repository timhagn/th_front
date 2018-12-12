/**
 * Strips the WordPress and Paragraph Tags from a given Drupal Node's Body.
 *
 * @param drupalText String   The given Drupal Text.
 *
 * @return String             The matched inner Text.
 */
export const stripGutenbergTags = drupalText => {
  const gutenbergRegEx = /.*<p>((.|\n)*?)<\/p>.*/
  const regExResult = drupalText.match(gutenbergRegEx)

  if (Array.isArray(regExResult) && regExResult.length > 0) {
    return regExResult[1]
  }
  return ''
}


/**
 * Add event listener to link removing every other nav-link-active.
 */
export const removeActive = () => {
  const anchors = document.getElementsByTagName('a')
  Array.prototype.forEach
      .call(anchors, element => element.classList.remove('nav-link-active'))
}
