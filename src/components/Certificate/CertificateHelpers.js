import React from 'react'
import Img from 'gatsby-image'

/**
 * Maps sliderData to slides (<Slide />) & descriptions (<SlideDescription />).
 * @param sliderData
 * @return {*}
 */
const mapCertSlides = (sliderData) => {
  const builtSlides = {
    sliderContents: [],
  }
  sliderData.forEach((slide, index) => {
    builtSlides.sliderContents.push(
      <CertSlide key={`tech-slide-slide-${index}` }
             slide={slide}
             index={index} />)
  })
  return builtSlides
}


/**
 * A single slide component.
 * @param slide
 * @param index
 * @return {*}
 * @constructor
 */
const CertSlide = ({ slide, index }) => (
  <div className="slide-wrapper">
    <Img fluid={slide.relationships
      .field_slide_image.localFile.childImageSharp.fluid} />
  </div>
)

export default mapCertSlides