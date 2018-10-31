import styled from 'styled-components'
import media from "styled-media-query"

import profile from '../../images/github-01.svg'
import profileHover from '../../images/github-hover-01.svg'
import profileMobile from '../../images/github-mobile-01.svg'
import profileMobileHover from '../../images/github-mobile-hover.svg'

/**
 * Styled GitHub Profile Image Link.
 */
const Profile = styled.div`
  background: url('${ profile }') no-repeat;
  width: 49px;
  padding-bottom:73px;
  color: #C7C7C7;
  align-self: flex-end;
  
  &:hover {
    background: url('${ profileHover }') no-repeat;
    color: white;
  }
  
  ${media.lessThan("medium")`
    background: url('${ profileMobile }') no-repeat;
    padding-bottom: 37px;
    
    &:hover {
      background: url('${ profileMobileHover }') no-repeat;
    }
  `}
`

export default Profile