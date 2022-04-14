import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Label, Loader, Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import NavBar2 from './navbar/navBar2'
import axios from 'axios'

const Container = styled.div`
  max-width: 600px;
  padding-left: 10px;
  padding-right: 10px;
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

class Register extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    isLoading: false,
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    check: false,
    formErrors: {
      fnameError: '',
      lnameError: '',
      emailError: '',
      passwordError: '',
      invalidError: '',
      checkError:'',
    }
  }

  validate = () => {
    let isError = false
    const { email, firstname, lastname, password, check, formErrors } = this.state

    if (email.indexOf("@") === -1) {
      this.setState(Object.assign(formErrors, {emailError: 'Email must be valid'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {emailError: ''} ))
    }

    if (firstname.length === 0) {
      this.setState(Object.assign(formErrors, {fnameError: 'First name is required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {fnameError: ''} ))
    }

    if (lastname.length === 0) {
      this.setState(Object.assign(formErrors, {lnameError: 'Last name is required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {lnameError: ''} ))
    }

    if (password.length < 6) {
      this.setState(Object.assign(formErrors, {passwordError: 'Password must be 6 characters or more'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {passwordError: ''} ))
    }

    if (check === false) {
      this.setState(Object.assign(formErrors, {checkError: 'Checkbox required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {checkError: ''} ))
    }

    return isError
  }

  handleRegister = e => {
    e.preventDefault()
    const err = this.validate()
    if (!err && this.state.check === true) {
      this.setState({ isLoading: true })
      axios.post('/api/user/register', {
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password,
      })
        .then(res => {
          localStorage.setItem('user_id', res.data.user_id)
          localStorage.setItem('isAuth', 'true')
          localStorage.setItem('isAdmin', 'false')
          this.props.history.push('/')
        })
        .catch(err => {
          if (err.response.data === 'email already used') {
            this.setState({ isLoading: false })
            this.setState(Object.assign(this.state.formErrors, {invalidError: 'Email already used'} ))
          }

          if (err.response.data === 'invalid email') {
            this.setState({ isLoading: false })
            this.setState(Object.assign(this.state.formErrors, {invalidError: 'Invalid email'} ))
          }
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
              {formErrors.fnameError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.fnameError}</Label>
              )}
              <Form.Input 
                maxLength="30"
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Nome' 
                onChange={(e) => {this.setState({firstname: e.target.value})}}
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
              <label>Mensagem</label>
              {formErrors.lnameError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.lnameError}</Label>
              )}
              <Form.TextArea 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Mensagem...' 
                onChange={(e) => {this.setState({lastname: e.target.value})}}
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
      </>
    )
  }
}

export default Register