/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require('lodash')
const crypto = require(`crypto`)


const createContentDigest = input => {
  const content = typeof input !== `string` ? JSON.stringify(input) : input
  return crypto
      .createHash(`md5`)
      .update(content)
      .digest(`hex`)
}


/**
 * Parse all Nodes with Markdown.
 * @param node
 * @param actions
 * @param createNodeId
 */
exports.onCreateNode = ({ node, actions, createNodeId }) => {
  const hasTextNodeValue = (node, fields = []) =>
      fields.reduce((acc, curr) => _.has(node, curr) ? true : acc, false)
  const getTextNodeValue = (node, fields = []) =>
      fields.reduce((acc, curr) => {
        const value = _.get(node, curr)
        return value ? value : acc
      }, '')
  const createMarkdownNode = (node, actions, createNodeId, content, id) => {
    const { createNode, createNodeField } = actions
    // create node with body content
    const textNode = {
      id: createNodeId(`${node.id}${id}`),
      parent: node.id,
      children: [],
      internal: {
        type: _.camelCase(`${node.internal.type} ${id}`),
        // mediaType will allow remark plugin to transform plain
        // text into markdown node
        mediaType: `text/markdown`,
        content,
        contentDigest: createContentDigest(content),
      },
    }
    createNode(textNode)
    // add link
    createNodeField({
      node,
      name: `${_.camelCase(id)}___NODE`,
      value: textNode.id
    })
  }

  if ((node.internal.type.indexOf(`node__`) !== -1 ||
       node.internal.type.indexOf(`paragraph__`) !== -1) &&
      getTextNodeValue(node, [`status`]) === true) {
    if (hasTextNodeValue(node, ['body.value', 'field_body.value'])) {
      if (getTextNodeValue(node, [`field_body.format`, `body.format`]) === `markdown`) {
        createMarkdownNode(node, actions, createNodeId,
            getTextNodeValue(node, ['body.value', 'field_body.value']),
            `MarkdownBody`)
      }
    }
    if (hasTextNodeValue(node, [`field_description.value`])) {
      if (getTextNodeValue(node, [`field_description.format`]) === `markdown`) {
        createMarkdownNode(node, actions, createNodeId,
            getTextNodeValue(node, [`field_description.value`]),
            `MarkdownDescription`)
      }
    }
  }
}
