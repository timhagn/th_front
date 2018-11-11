/**
 * Strips the WordPress and Paragraph Tags from a given Drupal Node's Body.
 *
 * @param drupalText String   The given Drupal Text.
 *
 * @return String             The matched inner Text.
 */
export const stripGutenbergTags = drupalText => {
  const gutenbergRegEx = /.*<p>(.*)<\/p>.*/
  const result = drupalText.match(gutenbergRegEx);
  if (Array.isArray(result) && result[1]) {
    return result[1]
  }
  return ''
}

export const getMenuLinks = async () => {
  // TODO: create menu links from Drupal.
}

/**
 * Should split the srcSet to get an accurate Background image...
 * @param imageData
 * @param width
 * @return {string}
 */
// TODO: Find a way for accurate sizing and effect ^^ - and why the #about_me and #projects links jump to the wrong points ^^.

export const getBackgroundSrc = (imageData, width) => {
  if (imageData.hasOwnProperty('srcSet')) {
    let srcArray = imageData.srcSet.split(',')
    let srcSetForWidth = srcArray.filter(currSet => {
      let src = currSet.split(' ')
      let srcWidth = src[1].replace('w', '')
      return (width > srcWidth)
    })
    if (srcSetForWidth[0]) {
      console.log(srcSetForWidth)
      return srcSetForWidth[0].split(' ')[0]
    }
    return srcArray[0].split(' ')[0]
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