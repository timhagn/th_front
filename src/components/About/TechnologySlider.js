import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from "styled-components";
import {
  DarkBackground,
  DarkHeadingColor, DarkTextColor,
  LightTextColor,
  SmallMargin
} from "../Utils/Constants";
import {mapSlides} from "../Utils/HelperFunctions";

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
      render={ data => {
        const settings = {
          className: "center",
          centerMode: true,
          infinite: true,
          slidesToShow: 3,
          centerPadding: `0`,
          autoplay: false,
          speed: 500,
          pauseOnFocus: true,
        }
        const title = data.slider.title
        const sliderData = data.slider.relationships.field_slider_content
        console.log(sliderData)
        const sliderContents = mapSlides(sliderData)
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