import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { Button, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import { Container, Image, Title, List, Link, LinkDiv, Nav, ImageMobile, StyledDropdown, LeftColumn, MiddleColumn, RightColumn, LeftMobile, MiddleMobile, RightMobile } from './navBarStyle'
import logo from './img/logo-ecaves.png'

const inputStyle = {
  width: '500px',
  paddingTop: '9px',
  paddingBottom: '8px',
  paddingLeft: '100px'
}

const mobileStyle = {
  width: '90%',
  paddingTop: '9px',
  paddingBottom: '8px'
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

class NavBar2 extends Component {

  state = {
    width: window.innerWidth,
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

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
    if (this.state.isAdmin === 'false') {
      return (
        <>
          <Link><Nav to="/post">Post</Nav></Link>
          <Link><Nav to="/mylistings">My Listings</Nav></Link>
          <Link><Nav to="/messages">Messages</Nav></Link>
          <Link><StyledButton onClick={this.logOut}>Logout</StyledButton></Link>
        </>
      )
    }
    if (this.state.isAdmin === 'true') {
      return (
        <>
          <Link><Nav to="/users">Users</Nav></Link>
          <Link><Nav to="/listings">Listings</Nav></Link>
          <Link><Nav to="/reviewlistings">Pending Listings</Nav></Link>
          <Link><StyledButton onClick={this.logOut}>Logout</StyledButton></Link>
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

  getNavMobile = () => {
    if (this.state.isAdmin === 'false') {
      return (
        <>
          <StyledDropdown title="Menu" variant="primary" drop="left">
            <Dropdown.Item onClick={() => {this.props.history.push('/post')}}>Post</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/mylistings')}}>My Listings</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/messages')}}>Messages</Dropdown.Item>
            <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
          </StyledDropdown>
        </>
      )
    }
    if (this.state.isAdmin === 'true') {
      return (
        <>
          <StyledDropdown title="Menu" variant="primary" drop="left">
            <Dropdown.Item onClick={() => {this.props.history.push('/users')}}>Users</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/listings')}}>Listings</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/reviewlistings')}}>Pending Listings</Dropdown.Item>
            <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
          </StyledDropdown>
        </>
      )
    }
    if (this.state.isAdmin === null) {
      return (
        <>
          <StyledDropdown title="Menu" variant="primary" drop="left">
            <Dropdown.Item onClick={() => {this.props.history.push('/virtual')}}>Experiências Virtuais</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/blog')}}>Blog</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/contact')}}>Contato</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/login')}}>Entre</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/register')}}>Cadastre-se</Dropdown.Item>
          </StyledDropdown>
        </>
      )
    }
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 1020;

    //mobile view
    if (isMobile) {
      return (
        <>
        <Container>
          <LeftMobile>
            <Nav to="/"><ImageMobile src={logo} height="45"  alt="logo"/></Nav>
          </LeftMobile>
          <MiddleMobile></MiddleMobile>
          <RightMobile>
            {this.getNavMobile()}
          </RightMobile>
        </Container>
        <Container>
          <MiddleMobile>
            <form onSubmit={this.handleSearch}>
              <Input 
                style={mobileStyle}
                size='large'
                action={{ icon: 'search' }} 
                name="search"
                placeholder='UF, Cidade, Caverna ou Parque' 
                value={this.props.queue}
                onChange={this.props.changeQueue}
                maxLength="60"
              />
            </form>
          </MiddleMobile>
        </Container>
        </>
      )
    } else {
      
      //desktop view
      return (
        <Container>
          <LeftColumn>
            <Nav to="/"><Image src={logo} height="40" alt="logo"/></Nav>
            {/* <Nav to="/"><Title>eCaves</Title></Nav> */}
          </LeftColumn>
          <MiddleColumn>
            <form onSubmit={this.handleSearch}>
              <Input 
                style={inputStyle}
                size='large'
                action={{ icon: 'search' }} 
                name="search"
                placeholder='UF, Cidade, Caverna ou Parque' 
                value={this.props.queue}
                onChange={this.props.changeQueue}
                maxLength="60"
              />
            </form>
          </MiddleColumn>
          <RightColumn>
            <List>
              {this.getNav()}
            </List>
          </RightColumn>
        </Container>
      )
    }
  }
}

export default withRouter(NavBar2);
