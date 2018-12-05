/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require(`gatsby/graphql`)
const crypto = require(`crypto`)

const createContentDigest = input => {
  const content = typeof input !== `string` ? JSON.stringify(input) : input

  return crypto
      .createHash(`md5`)
      .update(content)
      .digest(`hex`)
}

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  if (node.internal.type.indexOf(`node__`) !== -1 &&
      node.hasOwnProperty('body'))  {
    const { createNode, createNodeField } = actions

    if (_.get(node, `body.value`)) {
      // take markdown content
      const content = node.body.value

      // create node with body content
      const textNode = {
        id: createNodeId(`${node.id}MarkdownBody`),
        parent: node.id,
        children: [],
        internal: {
          type: _.camelCase(`${node.internal.type} MarkdownBody`),
          // mediaType will allow remark plugin to transform plain
          // text into markdown node
          mediaType: `text/markdown`,
          content,
          contentDigest: createContentDigest(content),
        },
      }

      createNode(textNode)

      // add link
      createNodeField({node, name: 'markdownBody___NODE', value: textNode.id})
    }
  }
}
