import React from 'react'
import {appConfig} from '../config/app-config'

// informacoes dd
import icon_contemplacao from '../assets/images/Ativo 757.svg'
import icon_iluminacao from '../assets/images/Ativo 738.svg'
import icon_guide from '../assets/images/Ativo 759.svg'
import icon_walk from '../assets/images/Ativo 768.svg'
import icon_helmet from '../assets/images/Ativo 764.svg'
import icon_torch from '../assets/images/Ativo 735.svg'
import icon_carparking from '../assets/images/Ativo 767.svg'
import icon_motoparking from '../assets/images/Ativo 767.svg'
import icon_nobusparking from '../assets/images/Ativo 767.svg'
// import icon_nobusparking from '../assets/images/Ativo 746.svg'
import icon_cachoeira from '../assets/images/Ativo 741.svg'
import icon_lanchonete from '../assets/images/Ativo 769.svg'
import icon_wc from '../assets/images/Ativo 848.svg'
import icon_wcpcd from '../assets/images/Ativo 740.svg'
import icon_museu from '../assets/images/Ativo 766.svg'
import icon_visitingcenter from '../assets/images/Ativo 734.svg'

import { InfoItem, SubTitle, DetailsCaption, Column, RightColumn, Container, StyledContainer, Title, Image, Images, Overview, Details, Description, Para, Map, TagsTitle, Tag, TagContainer, Footer } from './listing/listingStyle'

import ReactTooltip from 'react-tooltip';

const icons = [
  {
    id:'Contemplação',
    image: icon_contemplacao,
  },
  {
    id:'Iluminação interna',
    image: icon_iluminacao,
  },
  {
    id:'Caminhada',
    image: icon_walk,
  },
  {
    id:'Capacete',
    image: icon_helmet,
  },
  {
    id:'Guia',
    image: icon_guide,
  },
  {
    id:'Lanterna',
    image: icon_torch,
  },
  {
    id:'Estacionamento carro',
    image: icon_carparking,
  },
  {
    id:'Estacionamento motos',
    image: icon_motoparking,
  },
  {
    id:'Estacionamento ônibus',
    image: icon_nobusparking,
  }, 
  {
    id:'Cachoeira',
    image: icon_cachoeira,
  },
  {
    id:'Trilha',
    image: icon_contemplacao,
  },
  {
    id:'Lanchonete',
    image: icon_lanchonete,
  },
  {
    id:'Museu',
    image: icon_museu,
  },
  {
    id:'WC PCD',
    image: icon_wcpcd,
  },
  {
    id:'WC',
    image: icon_wc,
  },
  {
    id:'Centro de Visitantes',
    image: icon_visitingcenter,
  },  
];

// src={`${appConfig.apiEndpoint}/grabImg/${this.state.listing[0].images.length>0?this.state.listing[0].images[0].id:null}`}

export function Info(props) {
  const picked = icons.find(o => o.id === props.info.name);
  return (!picked)?null:<InfoItem>
          <img src={picked.image} alt="contemplacao" width = {props.width} heigth = {props.height} data-tip data-for={props.info.name}/>
          <ReactTooltip id={props.info.name} place="bottom" type="info" effect="solid">{props.info.description}</ReactTooltip>
        </InfoItem>
}


export function showInfos(cave, category, size) {
  console.log(`at showinfos ${category}`)
  console.log(cave.name);
  if (cave.infos==null) return null;
  const infos=cave.infos.filter(function(item){ return item["category"]===category;});
  if (infos.length===0) {
    console.log("showinfos null")
    return null 
  } else {
    console.log("showinfos items")
    return (
      infos.map(item => (
                <Info info={item} width={size} height={size}/>
                )
      )
    )
  }
}

export default Info