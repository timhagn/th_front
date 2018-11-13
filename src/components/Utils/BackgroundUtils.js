/**
 * Gets styles by a classname.
 *
 * @notice The className must be 1:1 the same as in the CSS
 * @param className string
 */
const getStyle = className => {
  const styleSheets = window.document.styleSheets;
  for (let i = 0; i < styleSheets.length; i++) {
    const classes = styleSheets[i].rules || styleSheets[i].cssRules;
    if (!classes)
      continue;
    for (let x = 0; x < classes.length; x++) {
      if (classes[x].selectorText === className) {
        let ret;
        if(classes[x].cssText){
          ret = classes[x].cssText;
        } else {
          ret = classes[x].style.cssText;
        }
        if(ret.indexOf(classes[x].selectorText) === -1){
          ret = `${classes[x].selectorText}{${ret}}`;
        }
        return ret;
      }
    }
  }
}

/**
 * Gets rules from a css Text.
 *
 * @param styleContent
 * @return {CSSRuleList}
 */
const rulesForCssText = function (styleContent) {
  const doc = document.implementation.createHTMLDocument(""),
        styleElement = document.createElement("style");

  styleElement.textContent = styleContent;
  // the style will only be parsed once it is added to a document
  doc.body.appendChild(styleElement);

  console.log(styleElement.sheet)

  return styleElement.sheet.cssRules;
};

/**
 * Filters out Background Rules for a given class Name.
 * @param className
 * @return {{}}
 */
const getBackgroundStylesForSingleClass = className => {
  const style = getStyle(`.${className}`)
  const cssStyleRules = rulesForCssText(style)
  console.log(className, style, cssStyleRules)
  if (cssStyleRules.length > 0 &&
      typeof(cssStyleRules[0].style) !== 'undefined') {
    // Filter out background(-*) rules that contain a definition.
    return Object.keys(cssStyleRules[0].style)
        .filter(k =>
            k.indexOf('background') === 0 && cssStyleRules[0].style[k] !== '')
        .reduce((newData, k) => {
          newData[k] = cssStyleRules[0].style[k]
          return newData
        }, {})
  }
  return {}
}

/**
 * Uses the above to get all background(-*) rules from given classes.
 * TODO: get classes for media queries...
 *
 * @param className
 * @return {*}
 */
const getBackgroundStyles = className => {
  if (className.includes(' ')) {
    const classes = className.split(' ')
    let classObjects = []
    classes.forEach(item =>
        classObjects.push(getBackgroundStylesForSingleClass(item))
    )
    return Object.assign(...classObjects)
  }
  return getBackgroundStylesForSingleClass(className)
}

export default getBackgroundStyles


