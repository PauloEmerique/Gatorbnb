import React, { Component } from 'react'
import { Icon, Placeholder } from 'semantic-ui-react'
import { Modal, Button, Form } from 'react-bootstrap'
import { withRouter }  from 'react-router'
import { LeftColumn, RightColumn, Container, StyledContainer, Title, Image, Images, Overview, Details, Description, Para, Map, TagsTitle, Tag, TagContainer, Footer } from './listingStyle'
import { MobileLeftColumn, MobileRightColumn, MobileContainer, MobileStyledContainer, MobileTitle, MobileImage, MobileOverview, MobileDetails, MobilePara } from './listingMobileStyle'
import NavBar from '../navbar/navBar'
import Leaflet from './leaflet'
import Slider from './slider'
import axios from 'axios'

// informacoes
import helmetSVG from '../../assets/images/icon-helmet.svg'
import clockSVG from '../../assets/images/icon-clock.svg'
import lampSVG from '../../assets/images/icon-lamp.svg'
import informationSVG from '../../assets/images/icon-information.svg'
import facilitySVG from '../../assets/images/icon-facility.svg'
import toiletSVG from '../../assets/images/icon-toilet.svg'
// atividades
import trekkingSVG from '../../assets/images/icon-trekking.svg'
import explorerSVG from '../../assets/images/icon-explorer.svg'
import speleothemSVG from '../../assets/images/icon-speleothem.svg'
import waterfallSVG from '../../assets/images/icon-waterfall.svg'

const style = {
  position: 'static'
}

class Listing extends Component {

  state = {
    listing: [],
    photos: [],
    tags: [],
    loading: true,
    showSlider: false,
    width: window.innerWidth,
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    show: false,
    message: '',
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const { handle } = this.props.match.params
    this.getListing(handle)
    // this.getTags(handle)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  getListing = (handle) => {
    axios.get(`http://power.esensetec.com.br:9999/ecaves/api/cave/${handle}`)
      .then(res => {
        this.setState({
          listing: res.data
        })
        // axios.get(`/api/listing/photos/${res.data.listing_id}`)
        //   .then(res => {
        //     this.setState({
        //       loading: false,
        //       photos: res.data
        //     })
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getTags = (handle) => {
    axios.get(`/api/listing/tags/${handle}`)
      .then(res => {
        this.setState({
          tags: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSlider = () => {
    this.setState({
      showSlider: true
    })
  }

  showTags = () => {
    if (this.state.tags.length === 0) {
      return null 
    } else {
      return (
        this.state.tags.map(item => (
          <Tag key={item.tag_name}>{item.tag_name}</Tag>
        ))
      )
    }
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    if (this.state.isAuth === null) {
      this.props.history.push('/login')
    }
    let exist = false 
    if (this.state.isAuth === 'true') {
      axios.get('/api/message/myMessages')
        .then(res => {
          let temp = res.data
          temp.forEach(list => {
            if (list.listing_id === this.state.listing.listing_id) {
              exist = true
            }
          })
          if (exist === false) {
            this.setState({ show: true })
          } else {
            console.log('chatroom already exists')
          }
        })
    }
  }

  newMessage = e => {
    e.preventDefault()
    axios.post('/api/message/newMessage', {
      listingId: this.state.listing.listing_id,
      message: this.state.message
    })
      .then(() => {
        this.props.history.push('/messages')
      })
      .catch(err => {
         console.log(err.response.data)
      })
  }

  render() {
    const { width } = this.state
    const isMobile = width <= 1020
    const sliderClose = () => this.setState({ showSlider: false})

    //mobile view
    if(isMobile) {
      return (
        <>
          <NavBar />
          <MobileContainer>
            <MobileLeftColumn>
              <MobileTitle>
                {this.state.loading ? (
                  <Placeholder style={style}>
                    <Placeholder.Header style={style}>
                      <Placeholder.Line style={style}/>
                      <Placeholder.Line style={style}/>
                    </Placeholder.Header>
                  </Placeholder>
                ) : (
                  <>${this.state.listing.price} {this.state.listing.address}, {this.state.listing.zipcode}</>
                )}
              </MobileTitle>
              <Images>
                {this.state.loading ? (
                  <Placeholder style={{height: '300px', width: '525px', margin: 'auto'}}>
                    <Placeholder.Image />
                  </Placeholder>
                ) : (
                  <MobileImage src={this.state.photos[0].photo_url} onClick={this.handleSlider}/>
                )}
              </Images>
              <MobileOverview>Overview</MobileOverview>
                <MobileDetails><Icon name="building"/>{this.state.listing.housing_type}</MobileDetails>
                <MobileDetails><Icon name="bed"/>{this.state.listing.bedroom} Bedrooms</MobileDetails>
                <MobileDetails><Icon name="bath"/>{this.state.listing.bathroom} Bathrooms</MobileDetails>
                <MobileDetails><Icon name="square"/>{this.state.listing.squarefoot} sqft</MobileDetails>
                <MobileDetails><Icon name="car"/>{this.state.listing.distance} miles from SFSU</MobileDetails>
              <MobileOverview>Description</MobileOverview>
                <Description>
                  <MobilePara>{this.state.listing.description}</MobilePara>
                </Description>
            </MobileLeftColumn>
            <MobileStyledContainer>
            <MobileRightColumn>
              <Button variant="warning" size="lg" onClick={this.handleShow} block>Message</Button>
              <Map>
                <Leaflet />
              </Map>
              <TagsTitle>Tags</TagsTitle>
              <TagContainer>
                {this.showTags()}
              </TagContainer>
            </MobileRightColumn>
            </MobileStyledContainer>
            <Modal
              size="lg"
              show={this.state.showSlider}
              onHide={sliderClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Photos for {this.state.listing.address}, {this.state.listing.zipcode}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Slider results={this.state.photos} width="400px" height="250px"/>
              </Modal.Body>
            </Modal>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Send a message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control as="textarea" rows="8" onChange={(e) => {this.setState({message: e.target.value})}}/>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" size="lg" onClick={this.newMessage} block>Send</Button>
              </Modal.Footer>
            </Modal>
          </MobileContainer>
          <Footer>
          </Footer>
        </>
      )
    }

    //desktop view
    return (
      <>
      <NavBar />
      <Container>
        <LeftColumn>
          <Title>
            {this.state.loading ? (
              <Placeholder style={style}>
                <Placeholder.Header style={style}>
                  <Placeholder.Line style={style}/>
                  <Placeholder.Line style={style}/>
                </Placeholder.Header>
              </Placeholder>
            ) : (
              <>${this.state.listing.price} {this.state.listing.address}, {this.state.listing.zipcode}</>
            )}
          </Title>
          <Images>
            {this.state.loading ? (
              <Placeholder style={{height: '300px', width: '525px', margin: 'auto'}}>
                <Placeholder.Image />
              </Placeholder>
            ) : (
              <Image src={`http://power.esensetec.com.br:9999/ecaves/api/grabImg/${this.state.listing[0].images[0].id}`} onClick={this.handleSlider}/>
            )}
          </Images>
          
          <Overview>Informações</Overview>
            <Details><img src={clockSVG} alt="Icon chat" width = "15px" heigth = "15px"/></Details>
            <Details><img src={helmetSVG} alt="Icon helmet" width = "15px" heigth = "15px"/></Details>
            <Details><img src={lampSVG} alt="Icon lamp" width = "15px" heigth = "15px"/></Details>
            <Details><img src={informationSVG} alt="Icon information" width = "15px" heigth = "15px"/></Details>
            <Details><img src={facilitySVG} alt="Icon facility" width = "15px" heigth = "15px"/></Details>
            <Details><img src={toiletSVG} alt="Icon toilet" width = "15px" heigth = "15px"/></Details>
          <Overview>Atividades</Overview>
            <Details><img src={trekkingSVG} alt="Icon trekking" width = "15px" heigth = "15px"/></Details>
            <Details><img src={explorerSVG} alt="Icon explorer" width = "15px" heigth = "15px"/></Details>
            <Details><img src={speleothemSVG} alt="Icon speleothem" width = "15px" heigth = "15px"/></Details>
            <Details><img src={waterfallSVG} alt="Icon waterfall" width = "15px" heigth = "15px"/></Details>
          <Overview>Description</Overview>
            <Description>
              <Para>{this.state.listing.description}</Para>
            </Description>
        </LeftColumn>
        <StyledContainer>
        <RightColumn>
          {/* <Button variant="success" size="lg" onClick={this.handleShow} block>Message</Button> */}
          <Map>
            <Leaflet />
          </Map>
          <TagsTitle>Tags</TagsTitle>
          <TagContainer>
            {this.showTags()}
          </TagContainer>
        </RightColumn>
        </StyledContainer>
        <Modal
          size="lg"
          show={this.state.showSlider}
          onHide={sliderClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Photos for {this.state.listing.address}, {this.state.listing.zipcode}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Slider results={this.state.photos} width="800px" height="450px"/>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send a message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control as="textarea" rows="8" onChange={(e) => {this.setState({message: e.target.value})}}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" size="lg" onClick={this.newMessage} block>Send</Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer>
      </Footer>
      </>
    )
  }
}

export default withRouter(Listing)