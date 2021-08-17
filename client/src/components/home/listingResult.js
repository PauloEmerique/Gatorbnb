import React from 'react'
import { withRouter }  from 'react-router'
import { Icon } from 'semantic-ui-react'
import { Container, Link, Card, Image, Title, Type, Details, Address, Circle, Space, Span } from './listingResultStyle'

const ListingResult = props => {
  return (
    <Container>
      {props.results.map(item => (
        <Link to={`/listing/${item.id}`} key={item.id} target="_blank">
        <Card>
          <div>
            <Image src={item.thumbnail} alt="thumbnail"></Image>
          </div>
          <div>
            <Title>{item.name}</Title>
            <Type>
              <Circle/>
              <Span>{item.caveType}</Span>
            </Type>
            <Details>
              <Space><Icon name="bed"/>{item.description}</Space>
              <Space><Icon name="bath"/>{item.city}</Space>
              {item.lat} 
              {item.lon}
            </Details>
            <Address>{item.address}, {item.visitAdress}</Address>
          </div>
        </Card>
        </Link>
      ))}
    </Container>
  )
}

export default withRouter(ListingResult)