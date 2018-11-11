import styled from 'styled-components'
import logo from '../../images/logo-01.svg'
import logoHover from '../../images/logo-light-hover-01.svg'
import media from "styled-media-query"

const Logo = styled.div`
  background: url('${logo}') no-repeat;
  width: 83px;
  padding-bottom: 73px;
  margin-right: 13px;
  
  &:hover {
    background: url('${logoHover}') no-repeat;
  }
  
  ${media.lessThan("medium")`
    width: 42px;
    padding-bottom: 37px;
    margin-right: 8px;
  `}
`

export default Logo