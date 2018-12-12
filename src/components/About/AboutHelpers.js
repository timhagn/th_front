import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Maps sliderData to slides (<Slide />) & descriptions (<SlideDescription />).
 * @param sliderData
 * @return {*}
 */
const mapSlides = (sliderData) => {
  const builtSlides = {
    sliderContents: [],
    sliderDescriptions: [],
  }
  sliderData.forEach((slide, index) => {
    builtSlides.sliderContents.push(
      <Slide key={`tech-slide-slide-${index}` }
             slide={slide}
             index={index} />)
    builtSlides.sliderDescriptions.push(
      <SlideDescription key={`tech-slide-description-${index}` }
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
const Slide = ({ slide, index }) => (
  <div className="slide-wrapper">
    {slide.field_fontawesome_icon.trim().indexOf('own-') !== -1 ?
      <span>
        {slide.field_fontawesome_icon.trim().replace('own-', '')}
      </span>
      : <FontAwesomeIcon
        icon={['fab', slide.field_fontawesome_icon.trim()]}/>
    }
  </div>
)


/**
 * A single slide description component.
 * @param slide
 * @param index
 * @return {*}
 * @constructor
 */
const SlideDescription = ({ slide, index }) => (
  <div className="slide-description-wrapper">
    <div className="slider-info"
         dangerouslySetInnerHTML={{
           __html: slide.fields.markdownDescription.childMarkdownRemark.html,
         }} />
  </div>
)


export default mapSlides