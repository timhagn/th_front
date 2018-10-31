import styled from 'styled-components'
import profile from '../../images/github-01.svg'
import profileHover from '../../images/github-hover-01.svg'

const Profile = styled.div`
  background: url('${profile}') no-repeat;
  min-width: 49px;
  padding-bottom:73px;
  color: #C7C7C7;
  align-self: flex-end;
  &:hover {
    background: url('${profileHover}') no-repeat;
    color: white;
  }
`

export default Profile