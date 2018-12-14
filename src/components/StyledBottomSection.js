import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'
import StyledCopyrightSection from './Footer'
import StyledCertificateSection from './Certificate'
import StyledProjectsSection from './Projects'
import {
  Width,
  media,
  BlueBackground
} from './Utils/Constants'


const BottomSection = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "seamless-bg-desktop.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        mobile: file(relativePath: { eq: "seamless-bg-mobile.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 640) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
     render={data => {
       // Switch Image according to size on desktop / mobile.
       const imageData = Width > 640 ?
           data.desktop.childImageSharp.fluid :
           data.mobile.childImageSharp.fluid
       return (
          <BackgroundImage Tag="section"
                           className={className}
                           fluid={imageData}
                           backgroundColor={BlueBackground}
          >
            <StyledProjectsSection />
            <StyledCertificateSection />
            <StyledCopyrightSection />
          </BackgroundImage>
       )
     }
     }
    />
)

const StyledBottomSection = styled(BottomSection)`
  width: 100%;
  background-repeat: repeat-y;
  
  ${media.lessThan("medium")`
    background-size: contain !important;
    &:after, &:before {
      background-size: contain !important;
    }
  `}
`

export default StyledBottomSection