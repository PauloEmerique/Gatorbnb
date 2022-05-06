import React from 'react'
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components'

const FooterDiv = styled.div`
  padding: 20px;
  background-color: #2761ab;
  color: white;
`
const LinkDivW = styled.span`
  && {
    ${'' /* background-color: white; */}
    ${'' /* border-color: white; */}
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
    ${'' /* box-shadow: 0px 3px 5px grey; */}
    margin: px;
    padding: 6px 40px 6px 14px;
    :hover {
      ${'' /* background-color: #378bf7; */}
      color: #000000;  
    }
  }
`

class Footer extends React.Component {
  render() {
    return <>
            <FooterDiv>
              <a href={`https://blog.ecavesbrasil.com.br`} target='_blank'>
                <LinkDivW>Blog</LinkDivW>
              </a>
              <a href={`/contact`}>
                <LinkDivW>Contato</LinkDivW>
              </a>
              <a href={`/about`}>
                <LinkDivW>Sobre</LinkDivW>
              </a>
            </FooterDiv>
          </>
  }
}

export default Footer