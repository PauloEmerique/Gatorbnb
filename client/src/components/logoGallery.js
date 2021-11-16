import React from 'react'
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components'
// import {appConfig} from '../config/app-config'

import geep_logo from '../assets/images/geep-logo.png'
import ecossistema_logo from '../assets/images/ecossistema-logo.png'
import sbe_logo from '../assets/images/sbe-logo.png'
import sebrae_logo from '../assets/images/sebrae-logo.png'
import livinglab_logo from '../assets/images/livinglab-logo.png'

// const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';
// const PREFIX_URL = '/static/media/';

export const LogoItem = styled.div`
  width: 250px;
  ${'' /* position: fixed; */}
  float: left;
`

export const LogoLabel = styled.div`
  ${'' /* width: 300px; */}
  ${'' /* position: fixed; */}
  ${'' /* float: left; */}
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
`

const images = [
  {
    original: livinglab_logo, 
    originalHeight: '150px',
  },
  {
    original: sebrae_logo, 
    originalHeight: '150px',
  },
  {
    original: sbe_logo, 
    originalHeight: '150px',
  },
  {
    original: geep_logo, 
    originalHeight: '150px',
  },
];

// src={`${appConfig.apiEndpoint}/grabImg/${this.state.listing[0].images.length>0?this.state.listing[0].images[0].id:null}`}

class LogoGallery extends React.Component {
  render() {
    return <>
              <LogoItem><LogoLabel>Realização</LogoLabel><img width="180px" src={ecossistema_logo} alt="ecossistema"/></LogoItem>
              <LogoItem><LogoLabel>Apoio</LogoLabel><ImageGallery items={images} showNav={false} showPlayButton={false} showFullscreenButton={false} showThumbnails={false} showTitle={true} autoPlay={true}/></LogoItem>
          </>
  }
}

export default LogoGallery