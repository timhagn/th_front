import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  media,
  DefaultMarginAndFontSizeMobile, WrapperMarginsMobile,
  // LightTextColor,
  // SmallMargin
} from '../Utils/Constants'
import mapCertSlides from './CertificateHelpers'

/**
 * Returns the Certificate Slider Component.
 * @return {*}
 */
const CertificateSlider = () => (
  <StaticQuery query={graphql`
  {
    slider: nodeCertificatesSlider {
      id
      title
      relationships {
        field_certificates_slider {
          field_title
          field_description {
            value
            format
          }
          fields {
            markdownDescription {
              childMarkdownRemark {
                html
              }
            }
          }
          relationships {
            field_slide_image {
                localFile {
                  childImageSharp {
                    fluid(quality: 90, maxWidth: 960) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
            }
          }
        }
      }
    }
  }
  `}
  render={data => {
   const sliderSettings = {
     className: "cert-slider",
     centerMode: true,
     infinite: true,
     slidesToShow: 3,
     autoplay: true,
     speed: 500,
     pauseOnFocus: true,
     responsive: [
       {
         breakpoint: 641,
         settings: {
           arrows: true,
           dots: true,
           centerMode: false,
           slidesToShow: 1,
           autoplay: false,
         }
       },
     ]
   }
   const title = data.slider.title
   const sliderData = data.slider.relationships.field_certificates_slider
   const { sliderContents } = mapCertSlides(sliderData)
   return (
       <StyledCertificateSliderWrapper>
         <h2 className="light-heading">{title}</h2>
         <Slider {...sliderSettings}>
           {sliderContents}
         </Slider>
       </StyledCertificateSliderWrapper>
     )
   }
  }
  />
)

const StyledCertificateSliderWrapper = styled.div`
  .cert-slider {
    .slide-wrapper {
      border: 1px solid black;
      box-shadow: 10px 5px 5px black;
      transition: all 200ms linear;
      filter: blur(1px);
      transform: scale(0.5);
    }
    .slick-current .slide-wrapper {
      transform: scale(0.9) ;
      filter: none;
    }
  }
  
  ${media.lessThan("large")`
     margin: 0 ${ WrapperMarginsMobile }px;
  `}
`

export default CertificateSlider