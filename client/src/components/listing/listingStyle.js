import styled from 'styled-components'

export const Column = styled.div`
  width: 50%;
  position: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 120px;
  background-color: white;
`

export const RightColumn = styled.div`
  width: 620px;
  position: fixed;
  float: rigth;
`
// NOT USING THE RIGTH COLUMN

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #E5E5EA
`

export const StyledContainer = styled.div`
  width: 50%;
  heigth: 500px;
`

export const Title = styled.div`
  text-align: center;
  border-bottom: 1px solid grey;
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10px;
`

export const Image = styled.img`
  cursor: pointer;
  width: 100%;
  
  display: fixed;
  margin: auto;
  :hover {
    opacity: 0.85;
  }
`

export const Images = styled.div`
  padding-top: 15px;
`
  // heigth: 250px;

export const Overview = styled.div`
  font-size: 22px;
  width: 100%
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid grey;
  margin: 20px 20px 30px 20px;
`

export const Details = styled.span`
  width: 50%;
  font-size: 18px;
  display: block;
  margin: 20px 20px 30px 20px;
`

export const Description = styled.div`
  padding-left: 20px;
`

export const Para = styled.p`
  font-size: 18px;
`

export const Map = styled.div`
  padding-top: px;
  height: 300px;
`

export const TagsTitle = styled.div`
  font-size: 22px;
  padding: 20px 15px 10px 15px;
`

export const Tag = styled.div`
  display: inline-block !important;
  padding: 8px 8px 8px 12px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  margin: 5px;
  background-color: #E5E5EA;
  color: black;
`

export const TagContainer = styled.div`
  padding-left: 10px;
  width: 350px;
`

export const Button = styled.div`
  color: white;
  font-size: 30px;
  margin-top: 10px;
  padding: 15px;
  width: 350px;
  text-align: center;
  background-color: #999999;
  border-radius: 5px;
  box-shadow: 0px 3px 5px grey;
  :hover {
    background-color: #500150;
    pointer: cursor;
  }
`

export const Footer = styled.div`
  height: 95px;
  margin-top: 15px;
  background-color: grey;
  font-size: 30px;
  padding: 20px;
`