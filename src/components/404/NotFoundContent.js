import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  media,
  DefaultMarginAndFontSizeMobile,
  GridGapLineHeightBottomMargin,
  WrapperMarginsMobile,
  WrapperMaxWidthDesktop,
  WrapperMaxWidthMobile,
  LargeMargin,
  SmallMargin,
} from "../Utils/Constants"
import Button from "../Utils/Button"

/**
 * The Welcome Content displays the children of the Welcome Screen.
 *
 * @param className String    From styled components
 */
const NotFoundContent = ({ className }) => (
    <StaticQuery query={graphql`
      query {
        lostNode: nodeBasicContent(
          id: { eq: "646d60e1-7b5f-54db-a6f1-8858075fce92" }
        ) {
          id
          title
          field_body {
            value
            format
          }
        }
        notFoundImage: file(relativePath: { eq: "404-image.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 890) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
     render={ data => {
       const imageData = data.notFoundImage.childImageSharp.fluid
       const strippedText = data.lostNode.field_body.value
       return (
           <div className={className}>
             <h1>{data.lostNode.title}</h1>
             <StyledNotFoundContainer>
               <StyledNotFoundImage fluid={imageData}/>
               <StyledNotFoundTextArea>
                 <p>{strippedText}</p>
                 <StyledNotFoundButton to="/">
                   Take Me Home!
                 </StyledNotFoundButton>
               </StyledNotFoundTextArea>
             </StyledNotFoundContainer>
           </div>
       )
     }
     }
    />
)

const StyledNotFoundImage = styled(Img)`
  width: 100%;
  height: auto;
  grid-row: 1;
  grid-column: 2;
  
  ${media.lessThan("medium")`
     margin: ${ DefaultMarginAndFontSizeMobile }px auto;
     width: 60%;
  `}
`

const StyledNotFoundButton = styled(Button)`
  font-size: 14px;
  font-weight: 700;
  margin-right: ${ SmallMargin }px;
`

const StyledNotFoundTextArea = styled.div`
  display: block;
  justify-content: normal;
`

const StyledNotFoundContainer = styled.div`
  display: block;
  max-width: ${ WrapperMaxWidthMobile }px;
  margin: ${ DefaultMarginAndFontSizeMobile }px ${ WrapperMarginsMobile }px;
  
  ${media.greaterThan("small")`
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: ${ GridGapLineHeightBottomMargin }px; 
    margin: ${ DefaultMarginAndFontSizeMobile }px auto;
  `}
  
  ${media.greaterThan("medium")`
    max-width: ${ WrapperMaxWidthDesktop }px;
    margin: ${ LargeMargin }px auto;
  `}
`

const StyledNotFoundContent = styled(NotFoundContent)`
  display: block;
  
  ${media.lessThan("small")`
     h1 {
      margin-bottom: ${ DefaultMarginAndFontSizeMobile }px;
    }
  `}
`

export default StyledNotFoundContent