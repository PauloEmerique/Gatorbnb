import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Label, Loader, Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import NavBar from './navBar'
import NavBar2 from './navBar2'
import axios from 'axios'
import Footer from '../footer'
import {appConfig} from '../../config/app-config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
  max-width: 600px;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
`

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 15px;
  text-align: center;
`

const Warn = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: red;
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

  
  notify = () => toast("Conta Criada!",{
    onClose: () => this.props.history.push('/')
  });

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
      // axios.get(`${appConfig.apiEndpoint}/usercreate`)
      this.setState({ isLoading: true })
      axios.post(`${appConfig.apiEndpoint}/usercreate`, {
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password,
      })
        .then(res => {
            // localStorage.setItem('user_id', res.data.user_id)
            localStorage.setItem('user_id', 0)
            localStorage.setItem('isAuth', 'true')
            localStorage.setItem('isAdmin', 'false')
            this.setState({ isLoading: false })
            this.notify()
            // this.props.history.push('/')
          })
        .catch(err => {
          this.setState({ isLoading: false })
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

    if (this.state.isAuth === 'true') {
      return (
        <Redirect to="/"/>
      )
    } else {

    return (
      <>
      <NavBar2 />
      <Container>
        <Form onSubmit={this.handleRegister}>
          <Title>Crie sua Conta</Title>
          {/* <Warn>em breve ...</Warn> */}
          {/* <button onClick={notify}>Notify!</button> */}
          <ToastContainer />
          <Wrapper>
            <Form.Field>
              <label>E-mail</label>
              {formErrors.emailError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.emailError}</Label>
              )}
              <Form.Input 
                maxLength="30"
                fluid icon='user' 
                iconPosition='left' 
                placeholder='E-mail' 
                onChange={(e) => {this.setState({email: e.target.value})}}
              />
            </Form.Field>
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
              <label>Sobrenome</label>
              {formErrors.lnameError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.lnameError}</Label>
              )}
              <Form.Input 
                maxLength="30"
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Sobrenome' 
                onChange={(e) => {this.setState({lastname: e.target.value})}}
              />
            </Form.Field>
            <Form.Field>
              <label>Senha</label>
              {formErrors.passwordError.length > 0 && (
                <Label basic color='red' pointing='below'>{formErrors.passwordError}</Label>
              )}
              <Form.Input 
                maxLength="30"
                fluid icon='lock' 
                iconPosition='left' 
                placeholder='Senha' 
                type='password' 
                onChange={(e) => {this.setState({password: e.target.value})}}
              />
              <Checkbox  label='Eu concordo com os TERMOS E CONDIÇÕES' onChange={() => {this.setState({ check: !this.state.check })}}/>
              {formErrors.checkError.length > 0 && (
                <Label basic color='red' pointing='left'>{formErrors.checkError}</Label>
              )}
            </Form.Field>
          </Wrapper>
          {this.state.isLoading === false ? (
            <StyledButton  fluid size='large' type="submit">Criar Conta</StyledButton>
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
}

export default Register