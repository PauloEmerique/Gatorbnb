import React, { Component } from 'react'
import axios from 'axios'
import { Button, Input, Placeholder } from 'semantic-ui-react'
import styled from 'styled-components'
import About from './navbar/about'
import logo from './navbar/img/logo-ecaves.png'
import Background from './home/assets/digital-illustration-brian-edward-miller-6.jpg'
import ListingResult from './home/listingResult'
import ListingUc from './home/listingUc'
import {appConfig} from '../config/app-config'
import LogoGallery from './logoGallery'
import NavBar2 from './navbar/navBar2'
import Footer from './footer'
import MediaGallery from './listing/mediaGallery';
import ReactGA from "react-ga4";
import {Helmet} from "react-helmet";


const style = {
  position: 'static'
}

const placeholder = {
  position: 'static',
  width: '90%'
}

const StyledButton = styled(Button)`
  && {
    background-color: #2761ab;
    color: white;
    box-shadow: 0px 3px 5px grey;
    margin: 5px;
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
    padding: 6px 20px 6px 14px;
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

// style={{margin: '2px', height:'25px', padding:'1px 10px 1px 10px'}}
const Container = styled.div`
  // background-color: #330033;
  width: 100%;
  // height: 80vh;
  //background-image: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 30px;
`
const SplashContainer = styled.div`
  // background-color: #330033;
  width: 100%;
  height: 70vh;
  //background-image: url(${Background});
  background-image: url('https://api.ecavesbrasil.com.br/api/grabPicture/65601188-b954-4cf7-8fd0-5701eb0a99ad?index=2');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 30px;
`

const SplashContainer2 = styled.div`
  // background-color: #330033;
  width: 100%;
  ${'' /* height: 90vh; */}
  //background-image: url(${Background});
  ${'' /* background-image: url('https://api.ecavesbrasil.com.br/api/grabPicture/65601188-b954-4cf7-8fd0-5701eb0a99ad?index=2'); */}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 20px;
`

const ListingContainer = styled.div`
  // background-color: #330033;
  width: 100%;
  height: 80vh;
  // background-image: url(${Background});
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
  width: 500px;
  @media (max-width: 500px) {
    display: none;
  }
`

const RightColumn = styled.div`
  width: 600px;
`

const Wrapper = styled.div`
  float: right;
  margin-right: 10px;
`

const Title = styled.h1`
  color: white;
  font-size: 40px;
  padding-left: 5px
  text-shadow: 0px 2px 2px grey;
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

// const Footer = styled.div`
//   padding: 20px;
//   background-color: #2761ab;
//   color: white;
// `

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

export default class Landing extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    listings: [],
    ucs: [],
    splashs: [],
    noResults: false,
    loadingSplash: true,
    loading: true,
  }

  componentDidMount() {
    // ReactGA.initialize('UA-140468325-1', {
    // 'cookieDomain': 'auto',
    // 'debug': true
    // });
    // ReactGA.initialize('UA-140468325-1');
    // ReactGA.pageview(window.location.pathname + window.location.search)
    // const query = this.props.location.search
    // const parsed = queryString.parse(query);

    // this.setState({
    //   queue: parsed.queue,
    //   type: parsed.type,
    //   beds: parsed.beds,
    //   baths: parsed.baths,
    //   priceMax: parsed.priceMax,
    //   distanceMax: parsed.distanceMax,
    // })
    this.getSplash();
    var lat;
    var lon;
    console.log("before  geolocation")
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log("entered geolocation")
      lat=position.coords.latitude;
      console.log("Latitude is :", position.coords.latitude);

      lon=position.coords.longitude;
      console.log("Longitude is :", position.coords.longitude);
      console.log("will get listings");
      this.getUcs(lat,lon);
      this.getListings(lat,lon);
    });
    this.getUcs(lat,lon);
    this.getListings(lat,lon);
    ReactGA.initialize("G-F2D9Y4RRMY");
    ReactGA.send("home");
    console.log("just called GA4")
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

  getSplash = () => {
    axios.get(`${appConfig.apiEndpoint}/splash`)
      .then(res => {
        if (res.data.length === 0) {
          // this.setState({ noSplash: true})
        }
        else {
          let splashTemp = res.data.results
          this.setState({
              splashs: splashTemp,
              loadingSplash: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  getListings = (lat,lon) => {
    axios.get(`${appConfig.apiEndpoint}/home?lat=${lat}&lon=${lon}`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ noResults: true})
        }
        else {
          let listingsTemp = res.data
          this.setState({
              listings: listingsTemp,
              loading: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  getUcs = (lat,lon) => {
    axios.get(`${appConfig.apiEndpoint}/homeuc?lat=${lat}&lon=${lon}`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ noResults: true})
        }
        else {
          let listingsTemp = res.data
          this.setState({
              ucs: listingsTemp,
              loading: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
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
          <a href={`/virtual`}>
            <LinkDiv style={{margin: '5px'}}>Experiências Virtuais</LinkDiv>
          </a>
          <a href={`/blog`}>
            <LinkDiv style={{margin: '5px'}}>Blog</LinkDiv>
          </a>
          <a href={`/contact`}>
            <LinkDiv style={{margin: '5px'}}>Contato</LinkDiv>
          </a>
          <a href={`/about`}>
            <LinkDiv style={{margin: '5px'}}>Sobre</LinkDiv>
          </a>
          <StyledButton onClick={() => {this.props.history.push('/login')}} >Entre</StyledButton>
          <StyledButton onClick={() => {this.props.history.push('/register')}} >Cadastre-se</StyledButton>
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
        <Helmet>
           <title>Home</title>
        </Helmet>
        <Container>
          {/* <Nav>
            <LeftColumn>
              <Image src={logo} height="30" alt="logo" />
            </LeftColumn>
            <MiddleColumn>

            </MiddleColumn>
            <RightColumn>
              <Wrapper>
                {this.getNav()}
              </Wrapper>
            </RightColumn>
          </Nav> */}
          <NavBar2/>
          {/* <Header></Header> */}
          {/* <Description>Go ahead and discover the Caves world</Description> */}
          {/* <Search>
            <form onSubmit={this.handleSearch}>
              <Input size='small' action={{ icon: 'search' }} name="search" placeholder='Caverna, Parque ou Cidade' style={{width: '100%'}} />
            </form>
          </Search> */}
       
        {/* <SplashContainer/> */}
        <SplashContainer2>
        {this.state.loadingSplash ? (
              <Placeholder style={placeholder}>
                <Placeholder.Header style={style}>
                  <Placeholder.Line style={style}/>
                  <Placeholder.Line style={style}/>
                </Placeholder.Header>
              </Placeholder>
            ) : (
              <>
              <MediaGallery images={this.state.splashs} showThumbnails={false}/>;
              </>
            )}
        </SplashContainer2>
        <Text style={{margin: '5px'}}>eCaves apresenta o universo das cavernas turísticas brasileiras</Text>
        <LogoContainer style={{margin: '15px 5 5 5'}}>
          
          <LogoGallery/>
        </LogoContainer>
        <ListingContainer>
            <SectionHeader>Conheça Também</SectionHeader>
            <div align='center'>
              <a href={`http://www.iyck2021.org`} target='_blank'>
                <ImageBanner src={`https://ads.ecavesbrasil.com.br/www/delivery/avw.php?zoneid=1&amp;cb=${cacheBlocker()}&amp;n=a30e9a4e`} alt="thumbnail" ></ImageBanner>
              </a>
              <a href='https://brasil.un.org/pt-br/sdgs' target='_blank'>
                <ImageBanner src={`https://ads.ecavesbrasil.com.br/www/delivery/avw.php?zoneid=2&amp;cb=${cacheBlocker()}&amp;n=a0ea7b26`} alt="thumbnail" ></ImageBanner>
              </a>
            </div>
            <SectionHeader>Parques e Unidades de Conservação</SectionHeader>
            <ListingUc results={this.state.ucs}/>
            <SectionHeader>Cavernas para Visitar</SectionHeader>
            <ListingResult results={this.state.listings}/>
            <Footer/>
        </ListingContainer>
        </Container>
        {/* <About /> */}
      </>
    )
  }
}