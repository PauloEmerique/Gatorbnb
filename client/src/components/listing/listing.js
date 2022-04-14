import $ from "jquery";
import React, { Component } from 'react'
import { Icon, Placeholder } from 'semantic-ui-react'
import { Modal, Button, Form } from 'react-bootstrap'
import { withRouter }  from 'react-router'
import { Link, InfoItem, SubTitle, DetailsCaption, Column, RightColumn, Container, StyledContainer, Title, Image, Images, Overview, Details, Description, Para, Map, TagsTitle, Tag, TagContainer, Footer } from './listingStyle'
import { MobileLeftColumn, MobileRightColumn, MobileContainer, MobileStyledContainer, MobileTitle, MobileImage, MobileOverview, MobileDetails, MobilePara } from './listingMobileStyle'

import NavBar from '../navbar/navBar'
import NavBar2 from '../navbar/navBar2'
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

const placeholder = {
  position: 'static',
  width: '90%'
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
    axios.get(`${appConfig.apiEndpoint}/cave/${handle}`)
      .then(res => {
        console.log(res.data.results[0])
        this.setState({
          listing: res.data.results,
          loading: false,
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
    axios.get(`/api/listing/tagsx/${handle}`)
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
    return null
  }

  // showTags = () => {
  //   if (this.state.tags.length === 0) {
  //     return null 
  //   } else {
  //     return (
  //       this.state.tags.map(item => (
  //         <Tag key={item.tag_name}>{item.tag_name}</Tag>
  //       ))
  //     )
  //   }
  // }

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



  // <Details><img src={trekkingSVG} alt="Icon trekking" width = "15px" heigth = "15px"/></Details>
  // <Details><img src={explorerSVG} alt="Icon explorer" width = "15px" heigth = "15px"/></Details>
  // <Details><img src={speleothemSVG} alt="Icon speleothem" width = "15px" heigth = "15px"/></Details>
  // <Details><img src={waterfallSVG} alt="Icon waterfall" width = "15px" heigth = "15px"/></Details>



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

      <NavBar2 />
      {this.state.loading ? (
              <Placeholder style={placeholder}>
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
                <SubTitle>{this.state.listing[0].city} / {this.state.listing[0].state} - <Link to={`/area/${this.state.listing[0].uc.id}`} key={this.state.listing[0].id}>{this.state.listing[0].uc.name}</Link></SubTitle>
                {/* <Details></Details> */}
                <Description>
                  {this.state.loading ? (
                    null           
                  ) : (
                    <div>
                      { <div dangerouslySetInnerHTML={{ __html: this.state.listing[0].description}} /> }
                    </div>
                  )}
                </Description>
                
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
              <InfoItem>{showInfos(this.state.listing[0],"equipamento", '45px')}</InfoItem>
              </>
            )}

          <Overview>Visitação</Overview>
          {this.state.loading ? (
              null
            ) : (
              <>
              <DetailsCaption>Dificuldade</DetailsCaption><Details>{this.state.listing[0].difficultyLevel}</Details>
              <DetailsCaption>Acessibilidade</DetailsCaption><Details>{this.state.listing[0].acessibility}</Details>
              <DetailsCaption>Tempo de Visitação</DetailsCaption><Details>{this.state.listing[0].visitTime}</Details>
              <DetailsCaption>Endereço</DetailsCaption><Details>{this.state.listing[0].visitAddress}</Details>
              <DetailsCaption>Calendário</DetailsCaption><Details>{this.state.listing[0].visitCalendar}</Details>
              <DetailsCaption>Ingressos</DetailsCaption>
              {/* <Details>{this.state.listing[0].visitTickets}</Details> */}
              { <Details dangerouslySetInnerHTML={{ __html: this.state.listing[0].visitTickets.replaceAll('\n','<br/>')}} /> }
              <DetailsCaption>Grupos</DetailsCaption><Details>{this.state.listing[0].visitGroups}</Details>
              <DetailsCaption>Centro de Visitantes</DetailsCaption><Details>{this.state.listing[0].visitCenter}</Details>
              <DetailsCaption>Facilidades</DetailsCaption><Details>{this.state.listing[0].visitFacilities}</Details>
              <DetailsCaption>Regras</DetailsCaption><Details>{this.state.listing[0].visitRules}</Details>
              <DetailsCaption>Outras Atividades</DetailsCaption><Details>{this.state.listing[0].visitOtherActivities}</Details>
              <DetailsCaption>No entorno</DetailsCaption><Details>{this.state.listing[0].visitSurroungindActivities}</Details>
              <DetailsCaption>Telefone</DetailsCaption><Details>{this.state.listing[0].contactPhone}</Details>
              <DetailsCaption>Site</DetailsCaption><Details dangerouslySetInnerHTML={{ __html: this.state.listing[0].contactSite}}/>
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
              <DetailsCaption>Presença de Água</DetailsCaption><Details>{this.state.listing[0].waterPresence}</Details>
              <DetailsCaption>Rio</DetailsCaption><Details>{this.state.listing[0].river}</Details>
              <DetailsCaption>Desenvolvimento</DetailsCaption><Details>{this.state.listing[0].development}</Details>
              <DetailsCaption>Projeção Horizontal</DetailsCaption><Details>{this.state.listing[0].horizontalProjection}</Details>
              <DetailsCaption>Desnível</DetailsCaption><Details>{this.state.listing[0].desnivel}</Details>
              <DetailsCaption>Tipo de Rocha</DetailsCaption><Details>{this.state.listing[0].rockType}</Details>
              <DetailsCaption>Ocorrências de Rochas</DetailsCaption><Details>{this.state.listing[0].rockOcurrence}</Details>
              <DetailsCaption>Rocha Principal</DetailsCaption><Details>{this.state.listing[0].mainRock}</Details>
              </>
            )}

            <Overview>Elementos Espeleológicos</Overview>
          {this.state.loading ? (
              null
            ) : (
              this.state.listing[0].speleothems.map(item => (
                <DetailsCaption>{item.name}</DetailsCaption>
                )
              )
            )}

           
          {this.state.loading ? (
              null
            ) : (
              <div>
                 { this.state.listing[0].embedCode? (<div><Overview>Visita 3D</Overview> <div dangerouslySetInnerHTML={{ __html: this.state.listing[0].embedCode}} /></div>):null }
              </div>
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

export default withRouter(Listing)