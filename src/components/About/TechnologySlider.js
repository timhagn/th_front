import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  media,
  DefaultMarginAndFontSizeMobile,
  LightTextColor,
  SmallMargin
} from '../Utils/Constants'
import mapSlides from './AboutHelpers'

/**
 * Returns the Technology Slider Component.
 * @param className
 * @return {*}
 * @constructor
 */
class TechnologySlider extends React.Component {
  constructor(props) {
    super(props)
    this.descriptionSlider = React.createRef()
  }

  handleBeforeChange = (current, next) =>
    this.descriptionSlider.current.slickGoTo(next)

  render() {
    return (
      <StaticQuery query={graphql`
      {
        slider: nodeTechnologiesSlider {
          title
          relationships {
            field_slider_content {
              field_title
              field_description {
                value
              }
              fields {
                markdownDescription {
                  childMarkdownRemark {
                    html
                  }
                }
              }
              field_fontawesome_icon
            }
          }
        }
      }
      `}
      render={data => {
       const sliderSettings = {
         className: "tech-icon-slider",
         arrows: false,
         centerMode: true,
         infinite: true,
         slidesToShow: 3,
         centerPadding: `-1px`,
         autoplay: true,
         speed: 500,
         pauseOnFocus: true,
         beforeChange: (current, next) => this.handleBeforeChange(current, next),
       }
       const descriptionSettings = {
         className: "center",
         centerMode: true,
         infinite: true,
         slidesToShow: 1,
         centerPadding: `0`,
         pauseOnHover: false,
         autoplay: false,
         draggable: false,
         swipe: false,
         touchMove: false,
       }
       const title = data.slider.title
       const sliderData = data.slider.relationships.field_slider_content
       const {sliderContents, sliderDescriptions} = mapSlides(sliderData)
       return (
           <StyledTechnologySliderWrapper>
             <h3 className="light-heading">{title}</h3>
             <Slider {...sliderSettings}>
               {sliderContents}
             </Slider>
             <Slider ref={this.descriptionSlider} {...descriptionSettings}>
               {sliderDescriptions}
             </Slider>
           </StyledTechnologySliderWrapper>
         )
       }
      }
      />
    )
  }
}

const StyledTechnologySliderWrapper = styled.div`
  width: 320px;
  
  h3 {
    margin-bottom: ${ SmallMargin }px;
  }
  
  .tech-icon-slider {
    .slide-wrapper {
      svg, span {
        color: ${LightTextColor};
        font-size: 2rem;
        height: 4rem;
        transition: all 200ms linear;
        filter: blur(1px);
      }
    }
    .slick-current {
      svg, span {
        font-size: 4rem;
        filter: none;
      }
    }
  }
  
  .slide-wrapper, .slide-description-wrapper { 
    max-width: 320px;
  }
  
  .slider-info p {
    color: ${ LightTextColor };
  }
 
  
  ${media.lessThan("medium")`
    display: block;
    margin-bottom: ${ DefaultMarginAndFontSizeMobile }px;
  `}
`

export default TechnologySlider