import React, { Component } from 'react'
import axios from 'axios'
import { Button, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import About from './navbar/about'
import logo from './navbar/img/logo-ecaves.png'
import Background from './home/assets/digital-illustration-brian-edward-miller-6.jpg'
import ListingResult from './home/listingResult'
import {appConfig} from '../config/app-config'
import LogoGallery from './logoGallery';
import NavBar2 from './navbar/navBar2'


const StyledButton = styled(Button)`
  && {
    background-color: #2761ab;
    color: white;
    box-shadow: 0px 3px 5px grey;
    margin: px;
    padding: 6px 14px 6px 14px;
    cursor: pointer;
    :hover {
      background-color: #378bf7;
      color: white;
      cursor: pointer;
    }
  }
`

const LinkDiv = styled.span`
  && {
    ${'' /* background-color: white; */}
    ${'' /* border-color: white; */}
    color: #222222;
    font-size: 15px;
    font-weight: bold;
    ${'' /* box-shadow: 0px 3px 5px grey; */}
    margin: px;
    padding: 6px 40px 6px 14px;
    :hover {
      ${'' /* background-color: #378bf7; */}
      color: #2761ab;  
    }
  }
`
const LinkDivW = styled.span`
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
const VirtualDiv = styled.div`
  height: 600px;
  width: 800px;
  background-color: #DDEEFF;
  padding: 15px;
`

const VirtualName = styled.h1`
  color: black;
  font-size: 24px;
  padding-left: 5px
  ${'' /* text-shadow: 0px 3px 3px grey; */}
`

// style={{margin: '2px', height:'25px', padding:'1px 10px 1px 10px'}}
const Container = styled.div`
  // background-color: #330033;
  width: 100%;
  ${'' /* height: 20vh; */}
  //background-image: url(${Background});
  ${'' /* background-image: url('https://api.ecavesbrasil.com.br/api/grabPicture/65601188-b954-4cf7-8fd0-5701eb0a99ad?index=2'); */}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 30px;
  
`

const ListingContainer = styled.div`
  // background-color: #330033;
  width: 100%;
  height: 80vh;
  // background-image: url(${Background});
  margin-left: 100px;
`

const LogoContainer = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
  justify-content: center;
  ${'' /* align-items: center; */}
`

const Nav = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  margin: 0 auto;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
`

const LeftColumn = styled.div`
  // width: 70px;
`

const MiddleColumn = styled.div`
  text-align: center;
  font-size: 16px;
  width: 700px;
  @media (max-width: 500px) {
    display: none;
  }
`

const RightColumn = styled.div`
  width: 400px;
`

const Wrapper = styled.div`
  float: right;
  margin-right: 10px;
`

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 15px;
  text-align: center;
`
const MainText = styled.div`
  font-size: 16px;
  padding-bottom: 15px;
  text-align: center;
`


const Header = styled.h1`
  color: white;
  text-align: center;
  font-size: 35px;
  margin-top: 15vh;
`

const Description = styled.h1`
  color: white;
  text-align: center;
  font-size: 25px;
`

const Search = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
`

const Footer = styled.div`
  padding: 20px;
  background-color: #2761ab;
  color: white;
`

const Disclaimer = styled.h1`
  text-align: center;
  font-size: 25px;
`

const Para = styled.p`
  font-size: 12px;
  text-align: center;
`

const Image = styled.img`
  margin-left: 15px;
`

const ImageBanner = styled.img`
  margin: 15px 10px 15px 10px; 
  width: 300;
  height: 250;
`

const LargeBanner = styled.img`
  margin: 10px 10px 20px 10px; 
  width: 728;
  height: 180;
`
const SectionHeader = styled.div`
  color: #BBBBBB;
  text-align: center;
  font-size: 26px;
  margin: 3vh 0 1vh 0;
`

export const Text = styled.div`
  ${'' /* width: 300px; */}
  ${'' /* position: fixed; */}
  ${'' /* float: left; */}
  display: block;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 1.4;
`


function cacheBlocker(){
  const min = 100000;
  const max = 10000000;
  const rand = min + Math.random() * (max - min);
  return rand.toString()
}

export default class Virtual extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    listings: [],
    noResults: false,
  }

  componentDidMount() {
    this.getListings();
  }

  getListings = (lat,lon) => {
    axios.get(`${appConfig.apiEndpoint}/virtual`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ noResults: true})
        }
        else {
          let listingsTemp = res.data
          this.setState({
              listings: listingsTemp
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  handleSearch = e => {
    e.preventDefault()
    let query = e.target.elements.search.value
    query = query.replace(/ /g,"+")
    this.props.history.push(`/search/?queue=${query}`)
  }

  logOut = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('isAdmin')
    this.props.history.push('/login')
  }


  getNav = () => {
    if (this.state.isAdmin === 'true') {
      return (
        <>
          {/* <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/reviewlistings')}} inverted>Dashboard</Button> */}
          <Button style={{margin: '5px'}} onClick={this.logOut} inverted>Log Out</Button>
        </>
      )
    }
    if (this.state.isAdmin === 'false') {
      return (
        <>
          {/* <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/mylistings')}} inverted>Dashboard</Button> */}
          <Button style={{margin: '5px'}} onClick={this.logOut} inverted>Log Out</Button>
        </>
      )
    }
    if (this.state.isAdmin === null) {
      return (
        <>
          <LinkDiv style={{margin: '5px'}} onClick={() => {this.props.history.push('/virtual')}}>Experiências Virtuais</LinkDiv>
          <LinkDiv style={{margin: '5px'}} onClick={() => {this.blogopen()}}>Blog</LinkDiv>
          <StyledButton onClick={() => {this.props.history.push('/login')}} >Entre</StyledButton>
          {/* <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/register')}} inverted>Sign Up</Button> */}
        </>
      )
    }
  }

  blogopen() {
    window.open("https://blog.ecavesbrasil.com.br", "_ecavesblog")
  }

  render() {
    return (
      <>
        <NavBar2/>
        <Container>
        <br/><br/>
        <Title>Experiências Virtuais</Title>
          <MainText>Faça uma visita em 360 graus às cavernas...</MainText>          
        </Container>
        <ListingContainer>
            {/* <SectionHeader>Experiências Virtuais</SectionHeader> */}
            {this.state.listings.map(item => (
              <>
              <VirtualName>{item.name} por {item.embed_author}</VirtualName>
              <VirtualDiv id={item.id}>{<div  dangerouslySetInnerHTML={{ __html: item.embed_code}} /> }</VirtualDiv>
              </>
            ))}
            <Footer>
              <a href={`http://www.iyck2021.org`} target='_blank'>
                <LinkDivW>Blog</LinkDivW>
              </a>
              <a href={`http://www.iyck2021.org`} target='_blank'>
                <LinkDivW>Contato</LinkDivW>
              </a>
              <a href={`http://www.iyck2021.org`} target='_blank'>
                <LinkDivW>Sobre</LinkDivW>
              </a>
            </Footer>
        </ListingContainer>
        
        {/* <About /> */}
      </>
    )
  }
}