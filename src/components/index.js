import React from 'react'

import Layout from './Layout'
import StyledWelcomeSection from './Welcome'
import StyledAboutSection from './About'
import StyledBottomSection from './StyledBottomSection'

const MainPage = () => (
    <Layout>
      <StyledWelcomeSection />
      <StyledAboutSection />
      <StyledBottomSection />
    </Layout>
)

export default MainPage