import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="canonical" href="https://fcc.timhagn.com"/>
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
        <noscript>This website requires JavaScript. To contact us, please send us an email at: <a href="mailto:mail@timhagn.com">mail@timhagn.com</a></noscript>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html:`
            (function(document, script) {
            const projectName = 'portfolio'
            localStorage.setItem('example_project', 'Personal Portfolio')
            localStorage.setItem('fCC_null_hide', 'true')
          }(document, 'script'))
          `}}></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html:`
            (function(document) {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault()

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
                })
              })
            })
          }(document))
          `}}></script>
          <script type="text/javascript" src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html:`
            (function (document) {
              // Fix freeCodeCamp testers SEO "problem".
              function fixSEO() {
                const shadow = document.getElementById('fcc_test_suite_wrapper')
                if (shadow && typeof shadow.shadowRoot !== 'undefined') {
                  // console.log(shadow)
                  shadow.shadowRoot
                  // Bug report anchor.
                    .querySelector('a[href^="https://github.com/freeCodeCamp"]')
                    .setAttribute('rel', 'noopener noreferrer')
                }
              }

              window.addEventListener("load", fixSEO)
            }(document))
        `}} defer="defer" async={false}></script>
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
