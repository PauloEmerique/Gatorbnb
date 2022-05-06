import React from 'react'
import {appConfig} from '../config/app-config'

// informacoes dd


import { InfoGroup, InfoItem, InfoName, SubTitle, DetailsCaption, Column, RightColumn, Container, StyledContainer, Title, Image, Images, Overview, Details, Description, Para, Map, TagsTitle, Tag, TagContainer, Footer } from './listing/listingStyle'

import ReactTooltip from 'react-tooltip';
import { Label } from 'semantic-ui-react';
import { Span } from './home/listingResultStyle';


export function Info(props) {
  // const picked = icons.find(o => o.id === props.info.name);
  // const iconsrc = "http://localhost:8080/api/grabIcon?id="+props.info.filename;
  const iconsrc = `${appConfig.apiEndpoint}/grabIcon?id=${props.info.filename}`
  return <InfoItem>
           <img src={iconsrc} alt={props.info.name} width = {props.width} heigth = {props.height} data-tip data-for={`${props.info.id}`}/>
           {/* <br/><InfoName>{props.info.name}</InfoName> */}
           <ReactTooltip id={`${props.info.id}`} place="bottom" type="info" effect="solid">{props.info.description}</ReactTooltip>
         </InfoItem>
}


export function showInfos(cave, category, size, isHomeFeatured) {
  // console.log(`at showinfos ${category}`)
  // console.log(cave.name);
  if (cave.infos==null) return null;
  var infos=(category==="*")?cave.infos.filter(function(item){ return item["category"]!=="dicas_regras";}):cave.infos.filter(function(item){ return item["category"]===category;});
  if (isHomeFeatured) infos=infos.filter(function(item){ return item["isHomeFeatured"]===true})
  if (infos.length===0) {
    // console.log("showinfos null")
    return null 
  } else {
    // console.log("showinfos items")
    return (
      <>
      {
        (category!=="*")?<Label style={{margin:0}}>{category}</Label>:''
      }
      <InfoGroup>
        {
        infos.map(item => (
                  <Info id={item.id} info={item} width={size} height={size}/>
                  )
        )
        }
      </InfoGroup>
      <br/>
      <br/>
      </>
    )
  }
}

export default Info