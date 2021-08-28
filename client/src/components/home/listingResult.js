import React from 'react'
import { withRouter }  from 'react-router'
// import { Icon } from 'semantic-ui-react'
import { Container, Link, Card, Image, Title, Type, Details, Address, Circle, Space, Span, Icon, DivLeft } from './listingResultStyle'
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

const ListingResult = props => {
  return (
    <Container>
      {props.results.map(item => (
        <Link to={`/listing/${item.id}`} key={item.id} target="_blank">
        <Card>
          <DivLeft>
            {item.images.length>0 ? <Image src={`http://power.esensetec.com.br:9999/ecaves//api/grabImg/${item.images[0].id}`} alt="thumbnail" ></Image> : <Span>No Images</Span> }
          </DivLeft>
          <DivLeft>
            <Title>{item.name}</Title>
            <Type>
              <Space>{item.city}/{item.state}</Space>
              {/* <Circle/>
              <Span>{item.caveType}</Span> */}
            </Type>
            <Details>
              <Space>{item.description}</Space>
                <img src={clockSVG} alt="Icon chat" width = "15px" heigth = "15px"/>
                <img src={helmetSVG} alt="Icon helmet" width = "15px" heigth = "15px"/>
                <img src={lampSVG} alt="Icon lamp" width = "15px" heigth = "15px"/>
                <img src={informationSVG} alt="Icon information" width = "15px" heigth = "15px"/>
                <img src={burgerSVG} alt="Icon burger" width = "15px" heigth = "15px"/>
                <img src={facilitySVG} alt="Icon facility" width = "15px" heigth = "15px"/>
                <img src={toiletSVG} alt="Icon toilet" width = "15px" heigth = "15px"/>
                <img src={trekkingSVG} alt="Icon trekking" width = "15px" heigth = "15px"/>
                <img src={explorerSVG} alt="Icon explorer" width = "15px" heigth = "15px"/>
                <img src={speleothemSVG} alt="Icon speleothem" width = "15px" heigth = "15px"/>
                <img src={waterfallSVG} alt="Icon waterfall" width = "15px" heigth = "15px"/>
            </Details>
            <Address>{item.address}, {item.visitAdress}</Address>
          </DivLeft>
        </Card>
        </Link>
      ))}
    </Container>
  )
}

export default withRouter(ListingResult)