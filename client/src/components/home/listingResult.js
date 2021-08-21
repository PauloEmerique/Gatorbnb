import React from 'react'
import { withRouter }  from 'react-router'
// import { Icon } from 'semantic-ui-react'
import { Container, Link, Card, Image, Title, Type, Details, Address, Circle, Space, Span, Icon, DivLeft } from './listingResultStyle'
import clockSVG from '../../assets/images/icon-clock.svg'
import helmetSVG from '../../assets/images/icon-helmet.svg'

const ListingResult = props => {
  return (
    <Container>
      {props.results.map(item => (
        <Link to={`/listing/${item.id}`} key={item.id} target="_blank">
        <Card>
          <DivLeft>
            {item.images.length>0 ? <Image src={`http://192.168.15.142:8080/api/grabImg/${item.images[0].id}`} alt="thumbnail"></Image> : <Span>No Images</Span> }
          </DivLeft>
          <DivLeft>
            <Title>{item.name}</Title>
            <Type>
              <Circle/>
              <Span>{item.caveType}</Span>
            </Type>
            {/* <Details>
              <Space><Icon name="bed"/>{item.description}</Space>
              <Space><Icon name="bath"/>{item.city}</Space>
                <img src={clockSVG} alt="Icon chat" width = "15px" heigth = "15px"/>
                <img src={helmetSVG} alt="Icon helmet" width = "15px" heigth = "15px"/>
              
            </Details> */}
            <Address>{item.address}, {item.visitAdress}</Address>
          </DivLeft>
        </Card>
        </Link>
      ))}
    </Container>
  )
}

export default withRouter(ListingResult)