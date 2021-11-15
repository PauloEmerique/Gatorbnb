import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import styled from 'styled-components'

const Leaf = styled(Map)`
  margin-top: 10px;
  margin-bottom: 20px;
  height: 500px;
  width: 80%;
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
  // iconUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Ball-Right-Pink-icon.png',
  iconUrl: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/96/map-marker-icon.png',
  iconSize: [48, 48],
  iconAnchor: [11, 46]
})

const Leaflet = (props) => {
  
  // if (props.lat==null) return null
  console.log("at leaflet")
  /*
  // const latfix=props.lat.replace(".",",")
  console.log(props.lat)
  const latd=ParseGeo(props.lat)
  console.log(latd)
  const lond=ParseGeo(props.lon)
  console.log(lond)
  */
  const position = [-25.4321781, -49.2796458];
  // const position = [latd, lond];
  // item.lat, item.lon
  const zoom = 5;
  return (
    <Leaf center={position} zoom={zoom} scrollWheelZoom={false}> 
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.caves.map(item => (
        item.lat?
        <Marker position={[item.lat, item.lon]} icon={myIcon}>
          <Popup>
            {item.name} <br />
          </Popup>
        </Marker>
        :null
      ))}
    </Leaf>
  )
}

export default Leaflet