import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  margin: 0 auto;
  text-align: center;
`

export const Link = styled(NavLink)`
  color: black;
  :hover {
    color: #330033;
  }
`

export const Card = styled.div`
  width: 600px
  heigth: 120px;
  display: inline-block;
  margin: 10px 10px 10px 10px;
  background-color: white;
  box-shadow: 0px 4px 8px grey; 
`

export const DivLeft = styled.div`
  width: 30%;
  heigth: 30%
  display: inline-block;
  margin: 5px 5px 5px 15px;
  float: left;
`

export const Image = styled.img`
  width: 100%;
  height: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid #dfdfdf;
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-align: left
  padding-top: 15px;
  padding-bottom: 10px;
  padding-left: 15px;
  width: 100%;
  display: inline-block;
`

export const Type = styled.div`
  width: 100%;
  padding-left: 15px;
  // padding-top: 15px;
  padding-bottom: 15px;
  display: inline-block;
  text-align: left;
`

export const Details = styled.p`  
  text-align: left;
  padding-left: 15px;
  color: #3f3f3f;
`

export const Address = styled.p`
  text-align: left;
  padding-left: 15px;
  color: #595959;
`

export const Space = styled.span`
  padding-right: 8px;
`

export const Circle = styled.span`
  height: 8px;
  width: 8px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: green; 
  display: inline-block;
`

export const Span = styled.span`
  padding-right: 10px;
  color: #595959;
`

export const Icon = styled.span`
  height: 8px;
  width: 8px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: green; 
  display: inline-block;
`