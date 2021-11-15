import $ from "jquery";
import React, { Component } from 'react'
import { Icon, Placeholder } from 'semantic-ui-react'
import { Modal, Button, Form } from 'react-bootstrap'
import { withRouter }  from 'react-router'
import { Link, InfoItem, SubTitle, DetailsCaption, Column, RightColumn, Container, StyledContainer, Title, Image, Images, Overview, Details, Description, Para, Map, TagsTitle, Tag, TagContainer, Footer } from './listingStyle'
import { MobileLeftColumn, MobileRightColumn, MobileContainer, MobileStyledContainer, MobileTitle, MobileImage, MobileOverview, MobileDetails, MobilePara } from './listingMobileStyle'

import NavBar from '../navbar/navBar'
import Leaflet from './leaflet'
import Slider from './slider'
import {appConfig} from '../../config/app-config'
import axios from 'axios'



// import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";

// import ImageGallery from 'react-image-gallery';
import MediaGallery from './mediaGallery';
import ReactTooltip from 'react-tooltip';

import {showInfos} from '../info'

const style = {
  position: 'static'
}

// const images = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1018/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1019/250/150/',
//   },
// ];

class Area extends Component {

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
    // $(document).ready(function () {
    //   console.log("-- at hack point --")
    //   $(".image-gallery-slide").each(function( index ) {
    //     console.log( index + ": " + $( this ).attr("class") );
    //     $( this ).hide()
    //   });
    // });

    // const script = document.createElement("script");    
    // script.async = true;    
    // script.text = "$(\".image-gallery-slide\").each(function( index ) {console.log( index + \": \" + $( this ).attr(\"class\") ); $( this ).hide() });"; 
    // this.div.appendChild(script);
  }

  // xcomponentDidMount() {
  //   const script = document.createElement("script");    script.async = true;    script.text = "alert('huhu');";    this.div.appendChild(script);  }
  // render() {
  //   return (
  //     <div className="App" ref={el => (this.div = el)}>        <h1>Hello react</h1>
  //       {/* Script is inserted here */}
  //     </div>
  //   );
  // }

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
    axios.get(`${appConfig.apiEndpoint}/area/${handle}`)
      .then(res => {
        console.log(res.data.results[0])
        this.setState({
          listing: res.data.results,
          loading: false,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { width } = this.state
    const isMobile = width <= 1
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
                <Leaflet caves={this.state.listing}/>
              </Map>

              {/* <TagsTitle>Tags</TagsTitle>
              <TagContainer>
                {this.showTags()}
              </TagContainer> */}
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
      {/* <div className="App" ref={el => (this.div = el)}>
      </div> */}

      <NavBar />
      {this.state.loading ? (
              <Placeholder style={style}>
                <Placeholder.Header style={style}>
                  <Placeholder.Line style={style}/>
                  <Placeholder.Line style={style}/>
                </Placeholder.Header>
              </Placeholder>
            ) : (
              <>
              <MediaGallery images={this.state.listing[0].images}/>;
              </>
            )}
      <Container style= {{width: '100%', margin: 'auto'}}>
        <Column style= {{width: '100%', margin: 'auto'}}>
          <Title>
            {this.state.loading ? (
              <Placeholder style={style}>
                <Placeholder.Header style={style}>
                  <Placeholder.Line style={style}/>
                  <Placeholder.Line style={style}/>
                </Placeholder.Header>
              </Placeholder>
            ) : (
              <>
                <Title>{this.state.listing[0].name}</Title>
                <SubTitle>({this.state.listing[0].areaType})</SubTitle>
                <SubTitle>{this.state.listing[0].city} / {this.state.listing[0].state}</SubTitle>
                {/* <Details></Details> */}
                {/* <Description>
                  {this.state.loading ? (
                    null           
                  ) : (
                    <><Link to={`${this.state.listing[0].website}`} key={this.state.listing[0].id}>{this.state.listing[0].website}</Link></>
                  )}
                </Description> */}
                
              </>
            )}
          </Title>
          {/* <ImageGallery items={images} />; */}

          {/* <Images>
            {this.state.loading ? (
              <Placeholder style={{width: '100%', margin: 'auto'}}>
                <Placeholder.Image />
              </Placeholder>
            ) : (
              <Image style={{ width: '100%', margin: 'auto'}} src={`${appConfig.apiEndpoint}/grabImg/${this.state.listing[0].images.length>0?this.state.listing[0].images[0].id:null}`} onClick={this.handleSlider}/>
            )}
          </Images> */}
        </Column>
      </Container>
      <Container>
        <Column>
        <Overview>Informações</Overview>
            {this.state.loading ? (
              null
            ) : (
              <>
              <InfoItem>{showInfos(this.state.listing[0],"facilidades", '45px')}</InfoItem>
              <InfoItem>{showInfos(this.state.listing[0],"atividades", '45px')}</InfoItem>
              <InfoItem>{showInfos(this.state.listing[0],"acesso", '45px')}</InfoItem>
              </>
            )}

          <Overview>Visitação</Overview>
          {this.state.loading ? (
              null
            ) : (
              <>
              <DetailsCaption>Email</DetailsCaption><Details>{this.state.listing[0].email}</Details>
              <DetailsCaption>Telefone</DetailsCaption><Details>{this.state.listing[0].phone}</Details>
              <DetailsCaption>Site</DetailsCaption><Details>{this.state.listing[0].contactSite}</Details>
              <DetailsCaption>Saiba mais</DetailsCaption><Details>{this.state.listing[0].knowMore}</Details>
              <DetailsCaption>Administração</DetailsCaption><Details>{this.state.listing[0].adminEntity}</Details>
              </>
            )}
          


          {/* <Overview>Atividades</Overview>
          {this.state.loading ? (
              null           
            ) : (
              this.showInfos(this.state.listing[0],"atividades") 
            )}
          <Overview>Acesso</Overview>
          {this.state.loading ? (
              null           
            ) : (
              this.showInfos(this.state.listing[0],"acesso") 
            )}
          <Overview>Equipamento</Overview>
          {this.state.loading ? (
              null           
            ) : (
              this.showInfos(this.state.listing[0],"equipamento") 
            )}
          <Overview>Descrição</Overview>
            <Description>
            {this.state.loading ? (
              null           
            ) : (
              <Para>{this.state.listing[0].description}</Para>
            )}
            </Description> */}

            <Overview>Geologia, Hidrologia, Bioma</Overview>
          {this.state.loading ? (
              null
            ) : (
              <>
              <DetailsCaption>Bioma</DetailsCaption><Details>{this.state.listing[0].biome}</Details>
              <DetailsCaption>Clima</DetailsCaption><Details>{this.state.listing[0].climate}</Details>
              <DetailsCaption>Vegetação</DetailsCaption><Details>{this.state.listing[0].vegetation}</Details>
              <DetailsCaption>Fauna</DetailsCaption><Details>{this.state.listing[0].fauna}</Details>
              <DetailsCaption>Flora</DetailsCaption><Details>{this.state.listing[0].flora}</Details>
              </>
            )}

        </Column>
        <StyledContainer>
        <Column style={{ verticalAlign:'top', marginLeft:'15px', marginTop:'0px', width: '100%'}}>
          {/* <Button variant="success" size="lg" onClick={this.handleShow} block>Message</Button> */}
          <Map>
            <Leaflet caves={this.state.listing} scrollWheelZoom={false}/>
          </Map>
          {/* <TagsTitle>Tags</TagsTitle>
          <TagContainer>
            {this.showTags()}
          </TagContainer> */}
        </Column>
        </StyledContainer>
      </Container>
        <Footer>
          <Para>© 2021 eCaves Inc.·Privacidade·Termos·Mapa do site·Informações da empresa</Para>
        </Footer>
      </>
    )
  }
}

export default withRouter(Area)