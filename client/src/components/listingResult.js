import React from 'react'
import styled from 'styled-components'
import {Helmet} from "react-helmet";

const ResultTitle = styled.p`
  font-weight: bold;
  text-align: center;
`

export default class ListingResult extends React.Component {
  render() {
    const listings = this.props.value
    const listingItems = listings

    return (
      <>
        {/* <Helmet> */}
          <iframe title='a04c8cee' id='a04c8cee' name='a04c8cee' src='http://power.esensetec.com.br:3333/www/delivery/afr.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE' frameborder='0' scrolling='no' width='300' height='250' allow='autoplay'><a href='http://power.esensetec.com.br:3333/www/delivery/ck.php?n=a3ef56a6&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img src='http://power.esensetec.com.br:3333/www/delivery/avw.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a3ef56a6' border='0' alt='' /></a></iframe>
        {/* </Helmet> */}
        <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />"}} />;
        {listings && (
          <>
            <ResultTitle>JSON representation from backend, for vertical prototype only:</ResultTitle>
            <ul>
            {listingItems && listingItems.map(listing => (
              {/* <li key={listing.listing_id}>
              {JSON.stringify(listing)}
              <img src={listing.image} alt="cave"/>
            </li> */}
            ))}
            </ul>
          </>
        )}
      </>
    )
  }
}