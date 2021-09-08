import React from 'react'
import { Button } from 'semantic-ui-react'
import { Container, Title, Label, FilterType, Select, StyledButton } from './filterStyle'

const Filter = props => {
  return (
    <Container>
    {/* <form onSubmit={props.filterSearch}> */}
    <form onSubmit={console.log('submit')}>
      <Title>Filtrar Por</Title>
      <Label>
        <FilterType>Tipo</FilterType>
        <Select name="type" value={props.type} onChange={props.changeType}>
          <option value="">Qualquer</option>
          <option value="apartment">Caverna</option>
          <option value="house">Parque/UC</option>
        </Select>
      </Label>
      <Label>
        <FilterType>Dificuldade</FilterType>
        <Select name="difficulty" value={props.beds} onChange={props.changeBeds}>
          <option value="">Qualquer</option>
          <option value="1">Fácil</option>
          <option value="2">Média</option>
          <option value="3">Dificil</option>
        </Select>
      </Label>
      {/* <Label>
        <FilterType>Bathrooms</FilterType>
        <Select name="baths" value={props.baths} onChange={props.changeBaths}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </Select>
      </Label>
      <Label>
        <FilterType>Price</FilterType>
        <Select name="priceMax" value={props.priceMax} onChange={props.changePrice}>
          <option value="">No Max</option>
          <option value="400">$400</option>
          <option value="600">$600</option>
          <option value="800">$800</option>
          <option value="1000">$1,000</option>
          <option value="1500">$1,500</option>
          <option value="2000">$2,000</option>
          <option value="2500">$2,500</option>
          <option value="3000">$3,000</option>
          <option value="3500">$3,500</option>
          <option value="4000">$4,000</option>
          <option value="5000">$5,000</option>
          <option value="7000">$7,000</option>
          <option value="10000">$10,000</option>
        </Select>
      </Label> */}
      <Label>
        <FilterType>Distancia</FilterType>
        <Select name="distanceMax" value={props.distanceMax} onChange={props.changeDist}>
          <option value="">Sem Limite</option>
          <option value="10">10 KM</option>
          <option value="50">50 KM</option>
          <option value="15">100 KM</option>
          <option value="20">200 KM</option>
        </Select>
      </Label>
      <StyledButton>
        <Button style={{color: 'black'}}color='yellow' type="submit">Aplicar Filtro</Button>
      </StyledButton>
    </form>
    </Container>
  )
}

export default Filter