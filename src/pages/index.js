import React from 'react'
import 'typeface-rubik'

import GlobalStyle from '../components/GlobalStyle'
import MainPage from '../components'
// import NotFoundContainer from '../components/NotFoundContainer'

/**
 * Integrate FontAwesome Icons
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons'

library.add(fab, faAngleDown)

/**
 * Main Page.
 * @return {*}
 * @constructor
 */
const IndexPage = () => (
    <React.Fragment>
      <MainPage />
      {/*<NotFoundContainer/>*/}
      <GlobalStyle />
    </React.Fragment>
)

export default IndexPage
