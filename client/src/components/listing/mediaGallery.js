import React from 'react'
import ImageGallery from 'react-image-gallery';
import {appConfig} from '../../config/app-config'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

// src={`${appConfig.apiEndpoint}/grabImg/${this.state.listing[0].images.length>0?this.state.listing[0].images[0].id:null}`}

class MediaGallery extends React.Component {

  state = {
    showThumbnails: this.props.showThumbnails?this.props.showThumbnails:true,
    showNav: this.props.showNav?this.props.showNav:true,
  }

  componentDidMount() {
      this.setState({
        showThumbnails: this.props.showThumbnails
    })
  }

  render() {
    let i2=[]
    this.props.images.map(item =>(
      i2.push(
        {
          original: `${appConfig.apiEndpoint}/grabPicture/${item.id}?index=2`,
          thumbnail: `${appConfig.apiEndpoint}/grabPicture/${item.id}?index=0`,
          originalHeight: '70%',
          // originalWidth: '100%',
          thumbnailHeight:'100px',
          // thumbnailWidth:'300px',
          originalTitle: item.description,
          description: item.credits,
        }
      )
      
    ))
    return <ImageGallery items={i2} showNav={this.state.showNav} showPlayButton={true} showFullscreenButton={true} showThumbnails={this.state.showThumbnails} autoPlay={true}/>;
  }
}

export default MediaGallery