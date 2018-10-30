import styled from 'styled-components'
import logo from '../../images/logo-01.svg'
import logoHover from '../../images/logo-light-hover-01.svg'

const Logo = styled.div`
  background: url('${logo}') no-repeat;
  min-width: 83px;
  padding-bottom:73px;
  margin-right: 13px;
  &:hover {
    background: url('${logoHover}') no-repeat;
  }
`

export default Logo