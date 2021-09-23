import React from 'react'
import { Button } from 'semantic-ui-react'
import { Container, Title, Label, FilterType, Select, StyledButton, DistanceFilter, DifficultyFilter, TypeFilter } from './filterStyle'

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
        </Label><Label>
          <FilterType>Dificuldade</FilterType>
          <Select name="difficulty" value={props.beds} onChange={props.changeBeds}>
            <option value="">Qualquer</option>
            <option value="1">Fácil</option>
            <option value="2">Média</option>
            <option value="3">Dificil</option>
          </Select>
        </Label><Label>
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