import React from 'react'
import { withRouter }  from 'react-router'
// import { Icon } from 'semantic-ui-react'
import { InfoArea, InfoItem, Container, Link, Card, Image, Title, Type, Details, Address, Circle, Space, Span, SpanNoImage,  DivLeft, DivInfo, DivData, Description, DataText, DataTitle } from './listingResultStyle'
import styled from 'styled-components'

// import Leaflet from '../listing/leaflet'
import {showInfos} from '../info'
import {appConfig} from '../../config/app-config'


const SectionHeader = styled.div`
  color: #BBBBBB;
  text-align: center;
  font-size: 26px;
  margin: 3vh 0 1vh 0;
`


/*
<a href={`http://ads.ecavesbrasil.com.br/www/delivery/ck.php?n=a30e9a4e&amp;cb=${cacheBlocker()}`} target='_blank'>
*/

const ListingUc = props => {
  return (
    <>
    <Container>
      {/* <SectionHeader>Para Visitar</SectionHeader> */}
      {props.results.map(item => (
          <Card>
            <DivLeft>
              <Link to={`/area/${item.id}`} key={item.id}>
                {item.images.length>0 ? <Image src={`${appConfig.apiEndpoint}/grabPicture/${item.images[0].id}?index=1`} alt="thumbnail" ></Image> : <SpanNoImage>No Images</SpanNoImage> }
                <span>{item.images[0]?item.images[0].credits:''}</span>
              </Link>
            </DivLeft>

            <DivInfo>
              <Link to={`/area/${item.id}`} key={item.id}>
              <Title>{item.name}</Title>
              </Link>
              <Type>
                <Space>{item.city}/{item.state}</Space>
                {/* <Circle/>
                <Span>{item.caveType}</Span> */}
              </Type>
              <Details>
                {/* <Description>{item.description}</Description> */}
                <InfoArea>
                  <InfoItem>{showInfos(item,"*", '40px', true)}</InfoItem>
                </InfoArea>
                <InfoArea>
                  {/* <DivData>
                    <DataTitle>Tempo<br/></DataTitle>
                    <DataText>{item.visit_time}</DataText>
                  </DivData> */}
                  <DivData>
                    <DataTitle>Distância<br/></DataTitle>
                    <DataText>{Math.floor(item.distance/1000)} km</DataText>
                  </DivData>
                </InfoArea>
              </Details>
            </DivInfo>
          </Card>
        
      ))}
      {/* <div align='center'>
        <Leaflet caves={props.results}/>
      </div> */}
    </Container>
    {/* <SectionHeader>Novidades</SectionHeader>
    <div align='center'>
      <LargeBanner src={`https://ads.ecavesbrasil.com.br/www/delivery/avw.php?zoneid=3&amp;cb=98388238232523&amp;n=a8094c9b`} alt="blog" ></LargeBanner>
    </div> */}
    </>
  )
}

export default withRouter(ListingUc)