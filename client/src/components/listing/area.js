import $ from "jquery";
import React, { Component } from 'react'
import { Icon, Placeholder } from 'semantic-ui-react'
import { Modal, Button, Form } from 'react-bootstrap'
import { withRouter }  from 'react-router'
import { Link, InfoItem, SubTitle, DetailsCaption, Column, RightColumn, Container, StyledContainer, StyledContainerMobile, Title, Image, Images, Overview, Details, DetailsBold, DetailsArea, Description, Para, Map, TagsTitle, Tag, TagContainer} from './listingStyle'
import { MobileLeftColumn, MobileRightColumn, MobileContainer, MobileStyledContainer, MobileTitle, MobileImage, MobileOverview, MobileDetails, MobilePara } from './listingMobileStyle'

import NavBar from '../navbar/navBar'
import NavBar2 from '../navbar/navBar2'
import Leaflet from './leaflet'
import Slider from './slider'
import {appConfig} from '../../config/app-config'
import axios from 'axios'
import Footer from "../footer";


import icon_whats from '../../assets/images/whats.jpg'
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

  DetailSection = (label,obj) => {
    return (
      <>
        <DetailsCaption>{label}</DetailsCaption>
        { <Details dangerouslySetInnerHTML={{ __html: obj.replaceAll('\n','<br/>')}} /> }
      </>
    )

  }

  render() {
    const { width } = this.state
    const isMobile = width <= 1020
    const sliderClose = () => this.setState({ showSlider: false})

    //mobile view
    if(isMobile) {
      return (
        <>
        {/* <div className="App" ref={el => (this.div = el)}>
        </div> */}
  
        <NavBar2 />
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
        <Container style= {{width: '90%', margin: 'auto'}}>
          <Column>
          <Overview>Informações</Overview>
              {this.state.loading ? (
                null
              ) : (
                <>
                {showInfos(this.state.listing[0],"atividades", '40px', false)}
                {showInfos(this.state.listing[0],"facilidades", '40px', false)}
                {showInfos(this.state.listing[0],"acesso", '40px', false)}
                {showInfos(this.state.listing[0],"unidade_conservacao", '40px', false)}
                {showInfos(this.state.listing[0],"dicas_regras", '40px', false)}
                </>
              )}
  
            <Overview>Cavernas</Overview>
                {this.state.loading ? (
                    null
                  ) : (
                    this.state.listing[0].caves.map(item => (
                      <>
                      <a href={`/listing/${item.id}`}>
                      <DetailsCaption>{item.name}</DetailsCaption>
                      </a>
                      
                      <Details>
                      {item.isWhatsapp &&
                        <img alt="whatsapp" width="22" src={icon_whats}/>
                      }
                      {item.mobile}
                      </Details>
                      {item.email &&
                        <Details>{item.email}</Details>
                      }
                      {item.cadastur &&
                        <Details>Cadastur: {item.cadastur}</Details>
                      }
                      <br/>
                      </>
                      )
                    )
                  )}
  
            <Overview>Visitação</Overview>
            {this.state.loading ? (
                null
              ) : (
                <>
                <DetailsCaption>Email</DetailsCaption><Details>{this.state.listing[0].email}</Details>
                <DetailsCaption>Telefone</DetailsCaption><Details>{this.state.listing[0].phone}</Details>
                <DetailsCaption>Site</DetailsCaption><Details dangerouslySetInnerHTML={{ __html: this.state.listing[0].contactSite}}/>
                <DetailsCaption>Administração</DetailsCaption><Details>{this.state.listing[0].adminEntity}</Details>
                {this.DetailSection('Saiba mais',this.state.listing[0].knowMore)}
  
                <DetailsCaption>Guias e Monitores</DetailsCaption>
                {this.state.loading ? (
                    null
                  ) : (
                    this.state.listing[0].persons.map(item => (
                      <>
                      <DetailsBold>{item.name}</DetailsBold>
                      <Details>({item.personType})</Details>
                      <Details>
                      {item.isWhatsapp &&
                        <img alt="whatsapp" width="22" src={icon_whats}/>
                      }
                      {item.mobile}
                      </Details>
                      {item.email &&
                        <Details>{item.email}</Details>
                      }
                      {item.cadastur &&
                        <Details>Cadastur: {item.cadastur}</Details>
                      }
                      <br/>
                      </>
                      )
                    )
                  )}
                </>
              )}
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
            
            <Overview>Mapa</Overview>
            <StyledContainerMobile>
            <Map>
              <Leaflet caves={this.state.listing} scrollWheelZoom={false}/>
            </Map>

            </StyledContainerMobile>  
          </Column>

        </Container>
          <Footer/>
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
      <Container style= {{width: '90%', margin: 'auto'}}>
        <Column>
        <Overview>Informações</Overview>
            {this.state.loading ? (
              null
            ) : (
              <>
              {showInfos(this.state.listing[0],"atividades", '40px', false)}
              {showInfos(this.state.listing[0],"facilidades", '40px', false)}
              {showInfos(this.state.listing[0],"acesso", '40px', false)}
              {showInfos(this.state.listing[0],"unidade_conservacao", '40px', false)}
              {showInfos(this.state.listing[0],"dicas_regras", '40px', false)}
              </>
            )}

          <Overview>Cavernas</Overview>
              {this.state.loading ? (
                  null
                ) : (
                  this.state.listing[0].caves.map(item => (
                    <>
                    <a href={`/listing/${item.id}`}>
                    <DetailsCaption>{item.name}</DetailsCaption>
                    </a>
                    
                    <Details>
                    {item.isWhatsapp &&
                      <img alt="whatsapp" width="22" src={icon_whats}/>
                    }
                    {item.mobile}
                    </Details>
                    {item.email &&
                      <Details>{item.email}</Details>
                    }
                    {item.cadastur &&
                      <Details>Cadastur: {item.cadastur}</Details>
                    }
                    <br/>
                    </>
                    )
                  )
                )}

          <Overview>Visitação</Overview>
          {this.state.loading ? (
              null
            ) : (
              <>
              <DetailsCaption>Email</DetailsCaption><Details>{this.state.listing[0].email}</Details>
              <DetailsCaption>Telefone</DetailsCaption><Details>{this.state.listing[0].phone}</Details>
              <DetailsCaption>Site</DetailsCaption><Details dangerouslySetInnerHTML={{ __html: this.state.listing[0].contactSite}}/>
              <DetailsCaption>Administração</DetailsCaption><Details>{this.state.listing[0].adminEntity}</Details>
              {this.DetailSection('Saiba mais',this.state.listing[0].knowMore)}

              <DetailsCaption>Guias e Monitores</DetailsCaption>
              {this.state.loading ? (
                  null
                ) : (
                  this.state.listing[0].persons.map(item => (
                    <>
                    <DetailsBold>{item.name}</DetailsBold>
                    <Details>({item.personType})</Details>
                    <Details>
                    {item.isWhatsapp &&
                      <img alt="whatsapp" width="22" src={icon_whats}/>
                    }
                    {item.mobile}
                    </Details>
                    {item.email &&
                      <Details>{item.email}</Details>
                    }
                    {item.cadastur &&
                      <Details>Cadastur: {item.cadastur}</Details>
                    }
                    <br/>
                    </>
                    )
                  )
                )}
              </>
            )}
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
        <Footer/>
      </>
    )
  }
}

export default withRouter(Area)