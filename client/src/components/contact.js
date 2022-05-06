import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Label, Loader, Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import NavBar from './navbar/navBar'
import NavBar2 from './navbar/navBar2'
import axios from 'axios'
import Footer from './footer'
import {appConfig} from '../config/app-config'
import url from 'url'

// const url = require('url');

const Container = styled.div`
  max-width: 600px;
  padding: 10px 10px 100px 10px;
  margin: auto;
  margin-top: 5%;
`

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 15px;
  text-align: center;
`
const MainText = styled.div`
  font-size: 16px;
  padding-bottom: 15px;
  text-align: center;
`

const Wrapper = styled.div`
  border: 1px solid #dbdbdb;
  padding: 15px;
  border-radius: 4px;
`

const StyledButton = styled(Button)`
  && {
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #330033;
    color: white;
    box-shadow: 0px 3px 5px grey;
    :hover {
      background-color: #500150;
      color: white;
    }
  }
`

const Error = styled.span`
  color: red;
`

class Contact extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    isLoading: false,
    email: '',
    name: '',
    subject: '',
    message: '',
    check: true,
    formErrors: {
      nameError: '',
      messageError: '',
      subjectError: '',
      emailError: '',
      invalidError: '',
      checkError:'',
    }
  }

  validate = () => {
    let isError = false
    const { email, name, message, check, formErrors } = this.state

    if (email.indexOf("@") === -1) {
      this.setState(Object.assign(formErrors, {emailError: 'Informe um email válido'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {emailError: ''} ))
    }

    if (name.length === 0) {
      this.setState(Object.assign(formErrors, {nameError: 'Digite seu nome'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {nameError: ''} ))
    }
    
    if (message.length === 0) {
      this.setState(Object.assign(formErrors, {messageError: 'Digite sua mensagem'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {messageError: ''} ))
    }

    return isError
  }



  handleRegister = e => {
    e.preventDefault()
    const err = this.validate()
    let payload = {
      email: this.state.email,
      name: this.state.name,
      message: this.state.message,
      subject: this.state.subject
    }
    const params = new URLSearchParams(payload);
    if (!err && this.state.check === true) {
      this.setState({ isLoading: true })
      axios.get(`${appConfig.apiEndpoint}/sendmessage?${params}`)
        .then(res => {
          // localStorage.setItem('user_id', res.data.user_id)
          // localStorage.setItem('isAuth', 'true')
          // localStorage.setItem('isAdmin', 'false')
          // this.props.history.push('/')
          alert('Mensagem Enviada!')
        })
        .catch(err => {
          this.setState({ isLoading: false })
          // if (err.response.data === 'email already used') {
          //   this.setState({ isLoading: false })
          //   this.setState(Object.assign(this.state.formErrors, {invalidError: 'Email already used'} ))
          // }

          // if (err.response.data === 'invalid email') {
          //   this.setState({ isLoading: false })
          //   this.setState(Object.assign(this.state.formErrors, {invalidError: 'Invalid email'} ))
          // }
          alert('Ops! Alguma falha ao tentar enviar sua mensagem!')
          console.log(err.response.data)
        })
    } else {
      console.log('Submission Error')
    }
  }

  render() {
    const { formErrors } = this.state

    return (
      <>
      <NavBar2/>
      <Container>
        <Form onSubmit={this.handleRegister}>
          <Title>Envie sua Mensagem</Title>
          <MainText>Queremos muito receber suas sugestões, idéias, perguntas... </MainText>
          
          <Wrapper>
          <Form.Field>
              <label>Nome</label>
              {formErrors.nameError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.nameError}</Label>
              )}
              <Form.Input 
                maxLength="30"
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Nome' 
                onChange={(e) => {this.setState({name: e.target.value})}}
              />
            </Form.Field>
            
            <Form.Field>
              <label>E-mail</label>
              {formErrors.emailError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.emailError}</Label>
              )}
              <Form.Input 
                maxLength="30"
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Email' 
                onChange={(e) => {this.setState({email: e.target.value})}}
              />
            </Form.Field>

            <Form.Field>
              <label>Assunto</label>
              {formErrors.subjectError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.subjectError}</Label>
              )}
              <Form.Input 
                maxLength="30"
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Assunto' 
                onChange={(e) => {this.setState({subject: e.target.value})}}
              />
            </Form.Field>

            <Form.Field>
              <label>Mensagem</label>
              {formErrors.messageError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.messageError}</Label>
              )}
              <Form.TextArea 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Mensagem...' 
                onChange={(e) => {this.setState({message: e.target.value})}}
              />
            </Form.Field>
          </Wrapper>
          {this.state.isLoading === false ? (
            <StyledButton fluid size='large'type="submit">Enviar!</StyledButton>
          ) : (
            <Loader style={{ marginTop: '10px'}} active inline='centered' />
          )}
          <Error>{this.state.formErrors.invalidError}</Error>
        </Form>
        
      </Container>
      <Footer/>
      </>
    )
  }
}

export default Contact