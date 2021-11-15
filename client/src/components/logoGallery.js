import React from 'react'
import ImageGallery from 'react-image-gallery';
import {appConfig} from '../config/app-config'

import geep_logo from '../assets/images/geep-logo.png'
import ecossistema_logo from '../assets/images/ecossistema-logo.png'
import sbe_logo from '../assets/images/sbe-logo.png'
import sebrae_logo from '../assets/images/sebrae-logo.png'
import livinglab_logo from '../assets/images/livinglab-logo.png'

// const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';
const PREFIX_URL = '/static/media/';



const images = [
  {
    original: ecossistema_logo, 
    thumbnail: ecossistema_logo,
    originalHeight: '170px',
    description:'Realização',
    originalTitle:'Realização',
  },
  {
    original: livinglab_logo, 
    thumbnail: livinglab_logo,
    originalHeight: '170px',
    description:'Apoio',
    originalTitle:'Apoio',
  },
  {
    original: sebrae_logo, 
    thumbnail: sebrae_logo,
    originalHeight: '170px',
    description:'Apoio',
    originalTitle:'Apoio',
  },
  {
    original: sbe_logo, 
    thumbnail: sbe_logo,
    originalHeight: '170px',
    description:'Apoio',
  },
  {
    original: geep_logo, 
    thumbnail: geep_logo,
    originalHeight: '170px',
    description:'Apoio',
  },
];

// src={`${appConfig.apiEndpoint}/grabImg/${this.state.listing[0].images.length>0?this.state.listing[0].images[0].id:null}`}

class LogoGallery extends React.Component {
  render() {
    return <ImageGallery items={images} showNav={false} showPlayButton={false} showFullscreenButton={false} showThumbnails={false} showTitle={true} autoPlay={true}/>;
  }
}

export default LogoGallery