import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { DropdownButton } from 'react-bootstrap'

export const Container = styled.div`
  /*position: sticky;*/
  top: 0;
  height: 60px;
  width: 100%;
  background-color: #33003300;
  box-shadow: 0px 3px 5px grey;
  /*z-index: 1000; */
  display: flex;
  flex-direction: row;
`

export const LeftColumn = styled.div`
  min-width: 200px;
`

export const MiddleColumn = styled.div`
  width: 100%;
`

export const RightColumn = styled.div`
  min-width: 700px;
`

export const Image = styled.img`
  position: fixed;
  margin-top: 7px;
  margin-left: 25px;
`

export const Title = styled.div`
  position: fixed;
  margin-left: 85px;
  padding-top: 20px;
  color: #ffcc33;
  font-size: 30px;
  width: 130px;
  text-shadow: 0px 1px 1px #ffcc33;
`

export const List = styled.ul`
  float: right;
  padding-top: 18px;
  padding-right: 50px;
`

export const Link = styled.li`
  display: inline;
  font-size: 16px;
  padding-left: 50px;
`
export const LinkDiv = styled.span`
  && {
    ${'' /* background-color: white; */}
    ${'' /* border-color: white; */}
    color: #222222;
    font-size: 15px;
    font-weight: bold;
    ${'' /* box-shadow: 0px 3px 5px grey; */}
    margin: px;
    padding: 6px 10px 6px 10px;
    :hover {
      ${'' /* background-color: #378bf7; */}
      color: #2761ab;  
    }
  }
`

export const LinkDivW = styled.span`
  && {
    ${'' /* background-color: white; */}
    ${'' /* border-color: white; */}
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
    ${'' /* box-shadow: 0px 3px 5px grey; */}
    margin: px;
    padding: 6px 40px 6px 14px;
    :hover {
      ${'' /* background-color: #378bf7; */}
      color: #000000;  
    }
  }
`
export const Nav = styled(NavLink)`
  color: #ffcc33;
  :hover {
    text-decoration: underline;
    color: #ffcc33;
  }
`

export const ImageMobile = styled.img`
  margin-top: 7px;
  margin-left: 15px;
`

export const StyledDropdown = styled(DropdownButton)`
  float:right;
  margin-right: 15px;
  margin-top: 13px;
`

export const LeftMobile = styled.div`
  min-width: 65px;
`

export const MiddleMobile = styled.div`
  width: 100%;
  padding-left: 5px;
`

export const RightMobile = styled.div`
  min-width: 100px;
`

export const StyledButton = styled.button`
  border: none;
  background-color: #330033;
  color: #ffcc33;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`