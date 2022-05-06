import React from 'react'
import styled from 'styled-components'
import NavBar2 from '../navbar/navBar2'
import img from './assets/peter-profile.jpg'
import Footer from '../footer'

const Container = styled.div`
  background-color: #FFFFFF;
  margin: 50px 10px 100px 30px;
  height: 50%;
  width: 75%;
  border-radius: 5px;
  text-align: left;
  font-family: 'IBM Plex Sans', sans-serif;
`

const Title = styled.h1`
  margin: 120px 0 0 0;
`

const ProfileImage = styled.div`
  background-size: contain;
  background-image: url(${img});
  height: 300px;
  width: 300px;
  display:block;
  margin:auto;
`


export default class Ecaves extends React.Component {
  render() {
    return (
      <>
      <NavBar2/>
      <Container>
        <Title><br/>Sobre o eCaves<br/><br/></Title>
        
        <p>O ecaves surgiu com o propósito de ser uma ferramenta de facilitação de acesso às
informações sobre cavernas turísticas e as áreas onde elas se inserem.
Apesar de existirem muitas informações sobre cavernas turísticas, estas encontram-se de
modo geral dispersas e inseridas em meios muito especializados, dificultando o acesso ou
conhecimento do cidadão comum.</p>
<p>
O objetivo da plataforma é reunir um elenco base de informações sobre as cavernas que se
encontram abertas a visitação no Brasil, sintetizando o que há de mais relevante e ao
mesmo tempo subsidiando o turista no processo de decisão e seleção do local a ser
visitado.</p>
<p>
No site e no aplicativo (em fase de elaboração), além das informações sobre cavernas, os
usuários também podem conhecer mais sobre as Unidades de Conservação (UCs) onde se
inserem as cavernas.
</p>
<p>
As informações sobre cavernas e UCs foram coletadas através de consultas em pesquisas,
Planos de Manejo, secretarias do turismo e outros veículos, e armazenadas em um banco
de dados. Atrativos encontrados em cada caverna, necessidade de levar lanternas ou não,
normas e dicas, preço dos ingressos e atrações no entorno são alguns exemplos. Foram
reunidas também informações sobre o tempo e dificuldade de visitação, as infraestruturas
existentes e outros aspectos que podem auxiliar o usuário a selecionar a caverna mais
adequada a visitação por seu grupo.
</p>
<p>
Com o avanço da plataforma e o desenvolvimento de um aplicativo, busca-se integrar
amadores e cientistas, promovendo a ciência cidadã. A ciência cidadã é entendida como a
contribuição de cidadãos comuns com informações, sendo eles atores importantes no
processo de construção do conhecimento. No caso da conservação da natureza, os
“cidadãos cientistas” são voluntários que possuem afinidade por atividades na natureza e
que registram diversas informações sobre o meio ambiente. Na era digital, a ciência cidadã
é colocada em prática quando qualquer pessoa em qualquer localidade consegue contribuir
com informações acerca de um assunto através da Internet, mediante o uso de celulares e
aplicativos.</p>
<p>A inserção do cidadão nesta iniciativa possibilita que ele se aproprie e contribua com a
construção do conhecimento sobre cavernas, ampliando a compreensão do seu papel para
a conservação da natureza.</p>
<p>O ecaves, enquanto plataforma, vem promover a difusão de informações, estimulando que
mais pessoas conheçam e se interessem pelo patrimônio espeleológico.</p>
      </Container>
      <Footer/>
      </>
    )
  }
}