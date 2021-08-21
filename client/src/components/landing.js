import React, { Component } from 'react'
import axios from 'axios'
import { Button, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import About from './navbar/about'
import logo from './navbar/img/logo-ecaves.png'
import Background from './home/assets/brazilian-landscape.jpg'
import ListingResult from './home/listingResult'

const Container = styled.div`
  // background-color: #330033;
  width: 100%;
  height: 80vh;
  background-image: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const ListingContainer = styled.div`
  // background-color: #330033;
  width: 100%;
  height: 80vh;
  // background-image: url(${Background});
`

const Nav = styled.div`
  padding-top: 10px;
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
`

const LeftColumn = styled.div`
  // width: 70px;
`

const MiddleColumn = styled.div`
  width: 200px;
  @media (max-width: 500px) {
    display: none;
  }
`

const RightColumn = styled.div`
  width: 740px;
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

const Footer = styled.div`
  padding: 20px;
  background-color: #ededed;
`

const Disclaimer = styled.h1`
  text-align: center;
  font-size: 25px;
`

const Para = styled.p`
  font-size: 20px;
  text-align: center;
`

const Image = styled.img`
  margin-left: 15px;
`

export default class Landing extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    listings: [],
    noResults: false,
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

    this.getListings()
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

  getListings = (value) => {
    axios.get(`http://192.168.15.142:8080/api/home/${value}`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ noResults: true})
        }
        else {
          let listingsTemp = res.data
          this.setState({
              listings: listingsTemp
          })
          // let temp = []
          // listingsTemp.forEach(list => {
          //   if (list.confirmation === true) {
          //     temp.push(list)
          //   }
          // })
          // temp.forEach(list => {
          //   axios.get(`http://192.168.15.142:8080/api/photos/${list.listing_id}`)
          //     .then(res => {
          //       list.thumbnail = res.data[0].photo_url
          //       this.setState({
          //         listings: temp
          //       })
          //     })
          //     .catch(err => {
          //       console.log(err)
          //     })
          // })
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
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/reviewlistings')}} inverted>Dashboard</Button>
          <Button style={{margin: '5px'}} onClick={this.logOut} inverted>Log Out</Button>
        </>
      )
    }
    if (this.state.isAdmin === 'false') {
      return (
        <>
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/mylistings')}} inverted>Dashboard</Button>
          <Button style={{margin: '5px'}} onClick={this.logOut} inverted>Log Out</Button>
        </>
      )
    }
    if (this.state.isAdmin === null) {
      return (
        <> 
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/login')}} inverted>Login</Button>
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/register')}} inverted>Sign Up</Button>
        </>
      )
    }
  }

  render() {
    return (
      <>
        <Container>
          <Nav>
            <LeftColumn>
              <Image src={logo} height="38" width="216" alt="logo" />
            </LeftColumn>
            <RightColumn>
              <Wrapper>
                {this.getNav()}
              </Wrapper>
            </RightColumn>
          </Nav>
          <Header>Welcome to eCaves</Header>
          <Description>Go ahead and discover the Caves world</Description>
          <Search>
            <form onSubmit={this.handleSearch}>
              <Input size='massive' action={{ icon: 'search' }} name="search" placeholder='Enter a city or ZIP code' style={{width: '100%'}} />
            </form>
          </Search>
        </Container>
        <ListingContainer>
            <ListingResult results={this.state.listings}/>
          </ListingContainer>
        <Footer>
          <Para>eCaves - todos os direitos reservados </Para>
        </Footer>
        {/* <About /> */}
      </>
    )
  }
}