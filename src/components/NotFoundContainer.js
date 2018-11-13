import React from 'react'

import Layout from './Layout'
import StyledNotFound from "./404";

const NotFoundContainer = () => (
    <Layout notFound={true}>
      <StyledNotFound />
    </Layout>
)

export default NotFoundContainer