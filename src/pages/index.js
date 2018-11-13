import React from 'react'
import 'typeface-rubik'

import GlobalStyle from '../components/GlobalStyle'
import MainPage from '../components'
// import NotFoundContainer from '../components/NotFoundContainer'

const IndexPage = () => (
    <React.Fragment>
      <MainPage />
      {/*<NotFoundContainer/>*/}
      <GlobalStyle />
    </React.Fragment>
)

export default IndexPage
