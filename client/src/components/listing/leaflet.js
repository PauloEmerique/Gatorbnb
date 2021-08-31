import React from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import styled from 'styled-components'

const Leaf = styled(Map)`
  margin-top: 50px;
  height: 400px;
  width: 450px;
`

// function ParseGeo(input) {
const ParseGeo = (input) => {  
  console.log("at ParseGeo")
  if (input==null) return
  var parts = input.split(/[^\d\w]+/);
  console.log(parts)
  var coord = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[4]);
  return coord
}

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var dd = parseFloat(degrees) + parseFloat(minutes)/60 + parseFloat(seconds)/(60*60);

  if (direction === "S" || direction === "W") {
      dd = dd * -1;
  } // Don't do anything for N or E
  console.log("calculation is ")
  console.log(dd)
  return dd;
}

const myIcon = L.icon({
  iconUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Ball-Right-Pink-icon.png',
  iconSize: [95, 95],
  iconAnchor: [22, 94]
})

const Leaflet = (props) => {
  
  if (props.lat==null) return null
  console.log("at leaflet")
  // const latfix=props.lat.replace(".",",")
  console.log(props.lat)
  const latd=ParseGeo(props.lat)
  console.log(latd)
  const lond=ParseGeo(props.lon)
  console.log(lond)
  // const lon=this.ParseGeo(item.lon)
  // const position = [37.7749, -122.4194];
  // const position = [25.231944444444444, 49.2075];
  const position = [latd, lond];
  
  const zoom = 8;
  return (
    <Leaf center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={myIcon} />
    </Leaf>
  )
}

export default Leaflet