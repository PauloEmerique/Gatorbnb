import React from 'react'
import { withRouter }  from 'react-router'
// import { Icon } from 'semantic-ui-react'
import { Container, Link, Card, Image, Title, Type, Details, Address, Circle, Space, Span, SpanNoImage, Icon, DivLeft, DivInfo, DivData, Description, DataText, DataTitle } from './listingResultStyle'
import styled from 'styled-components'

import Leaflet from '../listing/leaflet'
import {appConfig} from '../../config/app-config'

import clockSVG from '../../assets/images/icon-clock.svg'
import helmetSVG from '../../assets/images/icon-helmet.svg'
import lampSVG from '../../assets/images/icon-lamp.svg'
import informationSVG from '../../assets/images/icon-information.svg'
import burgerSVG from '../../assets/images/icon-burger.svg'
import facilitySVG from '../../assets/images/icon-facility.svg'
import toiletSVG from '../../assets/images/icon-toilet.svg'

import trekkingSVG from '../../assets/images/icon-trekking.svg'
import explorerSVG from '../../assets/images/icon-explorer.svg'
import speleothemSVG from '../../assets/images/icon-speleothem.svg'
import waterfallSVG from '../../assets/images/icon-waterfall.svg'
import {Helmet} from "react-helmet";

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
  color: #CCCCCC;
  text-align: center;
  font-size: 26px;
  margin: 5vh 0 3vh 0;
`

const ListingResult = props => {
  return (
    <>
    <div align='center'>
      <LargeBanner src={`http://power.esensetec.com.br:3333/www/delivery/avw.php?zoneid=4&amp;cb=98388238230000&amp;n=aa158028`} alt="apoiadores" ></LargeBanner>
    </div>
    <SectionHeader>Conheça também...</SectionHeader>
    <div align='center'>
      <ImageBanner src={`http://power.esensetec.com.br:3333/www/delivery/avw.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=aef84788`} alt="thumbnail" ></ImageBanner>
      <ImageBanner src={`http://power.esensetec.com.br:3333/www/delivery/avw.php?zoneid=2&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a0ea7b26`} alt="thumbnail" ></ImageBanner>
      {/* <Helmet>
        <a href='http://power.esensetec.com.br:3333/www/delivery/ck.php?n=aef84788&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img src='http://power.esensetec.com.br:3333/www/delivery/avw.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=aef84788' border='0' alt='' /></a>
      </Helmet> */}
    </div>
    <Container>
      <SectionHeader>Para Visitar</SectionHeader>
      {props.results.map(item => (
        <Link to={`/listing/${item.id}`} key={item.id} target="_blank">
          <Card>
            <DivLeft>
              {item.images.length>0 ? <Image src={`${appConfig.apiEndpoint}/grabImg/${item.images[0].id}`} alt="thumbnail" ></Image> : <SpanNoImage>No Images</SpanNoImage> }
            </DivLeft>
            <DivInfo>
              <Title>{item.name}</Title>
              <Type>
                <Space>{item.city}/{item.state}</Space>
                {/* <Circle/>
                <Span>{item.caveType}</Span> */}
              </Type>
              <Details>
                <Description>{item.description}</Description>
                <DivData>
                  <DataTitle>Tempo<br/></DataTitle>
                  <DataText>{item.visit_time}</DataText>
                </DivData>
                <DivData>
                  <DataTitle>Dificuldade<br/></DataTitle>
                  <DataText>{item.difficult_level}</DataText>
                </DivData>
                <DivData>
                  <DataTitle>Distância<br/></DataTitle>
                  <DataText>{Math.floor(item.distance*100)} km</DataText>
                </DivData>
                  {/* <img src={clockSVG} alt="Icon chat" width = "15px" heigth = "15px"/>
                  <img src={helmetSVG} alt="Icon helmet" width = "15px" heigth = "15px"/>
                  <img src={lampSVG} alt="Icon lamp" width = "15px" heigth = "15px"/>
                  <img src={informationSVG} alt="Icon information" width = "15px" heigth = "15px"/>
                  <img src={burgerSVG} alt="Icon burger" width = "15px" heigth = "15px"/>
                  <img src={facilitySVG} alt="Icon facility" width = "15px" heigth = "15px"/>
                  <img src={toiletSVG} alt="Icon toilet" width = "15px" heigth = "15px"/>
                  <img src={trekkingSVG} alt="Icon trekking" width = "15px" heigth = "15px"/>
                  <img src={explorerSVG} alt="Icon explorer" width = "15px" heigth = "15px"/>
                  <img src={speleothemSVG} alt="Icon speleothem" width = "15px" heigth = "15px"/>
                  <img src={waterfallSVG} alt="Icon waterfall" width = "15px" heigth = "15px"/> */}
              </Details>
              {/* <Address>{item.address}, {item.visitAdress}</Address> */}
            </DivInfo>
          </Card>
        </Link>
      ))}
      <div align='center'>
        <Leaflet caves={props.results}/>
      </div>
    </Container>
    <SectionHeader>Novidades</SectionHeader>
    <div align='center'>
      <LargeBanner src={`http://power.esensetec.com.br:3333/www/delivery/avw.php?zoneid=3&amp;cb=98388238232523&amp;n=a8094c9b`} alt="blog" ></LargeBanner>
    </div>
    </>
  )
}

export default withRouter(ListingResult)