import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import CardContainer from './CardContainer'
import CardHeading from './CardHeading'
import FormLine from './FormLine'

class SignUpPage extends Component<{
  fromPathname: string
}> {

  // set the initial component state
  state = {
    errors: {},
    redirectToLogin: false,
    user: {
      email: '',
      name: '',
      password: ''
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  onSubmit = (event) => {
    // prevent default action. in this case, action is the form submission
    // event
    event.preventDefault()

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name)
    const email = encodeURIComponent(this.state.user.email)
    const password = encodeURIComponent(this.state.user.password)
    const formData = `name=${name}&email=${email}&password=${password}`

    // create an AJAX request
    const xhr = new XMLHttpRequest()
    xhr.open('post', 'http://localhost:4000/auth/signup')
    xhr.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    )
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success change the state
        this.setState({errors: {}})

        // set a message
        localStorage.setItem('successMessage', xhr.response.message)

        // make a redirect
        this.setState({ redirectToLogin: true })
      } else {
        // failure
        const errors = xhr.response.errors
          ? xhr.response.errors
          : {}
        errors.summary = xhr.response.message
        this.setState({errors})
      }
    })
    xhr.send(formData)
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  onChange = (event) => {
    const {user} = this.state
    const {name, value} = event.target
    user[name] = value
      ? value.trim()
      : ''
    this.setState({user})
  }

  /**
   * Render the component.
   */
  render() {
    const {errors, redirectToLogin, user} = this.state

    if (redirectToLogin) {
      return (
        <Redirect to={'/login'}/>
      )
    }

    return (
      <CardContainer>
        <form action='/' onSubmit={this.onSubmit}>
          <CardHeading>Sign Up</CardHeading>

          {errors.summary && <p style={{
              color: 'tomato',
              padding: '0 16px',
            }}>{errors.summary}</p>}

          <FormLine>
            <TextField
              floatingLabelText='Name'
              name='name'
              errorText={errors.name}
              onChange={this.onChange}
              value={user.name}/>
          </FormLine>

          <FormLine>
            <TextField
              floatingLabelText='Email'
              name='email'
              errorText={errors.email}
              onChange={this.onChange}
              value={user.email}/>
          </FormLine>

          <FormLine>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
              onChange={this.onChange}
              errorText={errors.password}
              value={user.password}/>
          </FormLine>

          <FormLine>
            <RaisedButton
              type='submit'
              label='Create New Account'
              primary />
          </FormLine>

          <CardText>Already have an account? <Link to={'/login'}>Log in</Link>
          </CardText>
        </form>
      </CardContainer>
    )
  }

}

export default SignUpPage
