import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from "styled-components";
import {LightTextColor, SmallMargin} from "../Utils/Constants";

const TechnologySlider = ({ className }) => (
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
              field_fontawesome_icon
            }
          }
        }
      }
      `}
      render={ data => {
        const settings = {
          className: "center",
          centerMode: true,
          infinite: true,
          slidesToShow: 3,
          centerPadding: `0`,
          autoplay: true,
          speed: 500
        }
        const title = data.slider.title
        const sliderData = data.slider.relationships.field_slider_content
        const sliderContents = sliderData.map((slide, index) => (
            <div key={`tech-slide-${index}`}>
              {slide.field_fontawesome_icon.trim().indexOf('own-') !== -1 ?
                  <span>
                    {slide.field_fontawesome_icon.trim().replace('own-', '')}
                  </span>
                  : <FontAwesomeIcon
                      icon={['fab', slide.field_fontawesome_icon.trim()]}/>
              }
            </div>
        ))
        return (
           <div className={className}>
             <h3 className="light-heading">{title}</h3>
             <Slider {...settings}>
               {sliderContents}
             </Slider>
           </div>
          )
        }
      }
    />
)

const StyledTechnologySlider = styled(TechnologySlider)`
  width: 320px;
  overflow: hidden;
  
  h3 {
    margin-bottom: ${ SmallMargin }px;
  }
  
  svg, span {
    color: ${ LightTextColor };
    font-size: 2rem;
    height: 4rem;
    transition: all 200ms linear;
    filter: blur(1px);
  }
  
  .slick-current {
    svg, span {
      font-size: 4rem;  
      filter: none;
    }
  }
`

export default StyledTechnologySlider