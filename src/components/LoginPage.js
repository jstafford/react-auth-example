import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Card, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import auth from '../modules/auth'

class LoginPage extends Component {

  // set the initial component state
  state = {
    errors: {},
    redirectToReferrer: false,
    successMessage: '',
    user: {
      email: '',
      password: ''
    }
  }

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context)
    const successMessage = localStorage.getItem('successMessage')
    if (successMessage) {
      this.setState({successMessage})
      localStorage.removeItem('successMessage')
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
    const email = encodeURIComponent(this.state.user.email)
    const password = encodeURIComponent(this.state.user.password)
    const formData = `email=${email}&password=${password}`

    // create an AJAX request
    const xhr = new XMLHttpRequest()
    xhr.open('post', 'http://localhost:4000/auth/login')
    xhr.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    )
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success change the component-container state
        this.setState({errors: {}})

        // save the token
        auth.authenticateUser(xhr.response.token)

        // change the current URL to /
        this.setState({ redirectToReferrer: true })
      } else {
        // failure change the component state
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
    const {errors, successMessage, user} = this.state
    const {from} = this.props.location.state || { from: { pathname: '/' } }
    const {redirectToReferrer} = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    return (
      <Card className='container'>
        <form action='/' onSubmit={this.onSubmit}>
          <h2 className='card-heading'>Login</h2>

          {successMessage && <p className='success-message'>{successMessage}</p>}
          {errors.summary && <p className='error-message'>{errors.summary}</p>}

          <div className='field-line'>
            <TextField
              floatingLabelText='Email'
              name='email'
              errorText={errors.email}
              onChange={this.onChange}
              value={user.email}/>
          </div>

          <div className='field-line'>
            <TextField
              floatingLabelText='Password'
              type='password'
              name='password'
              onChange={this.onChange}
              errorText={errors.password}
              value={user.password}/>
          </div>

          <div className='button-line'>
            <RaisedButton type='submit' label='Log in' primary />
          </div>

          <CardText>Don’t have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
        </form>
      </Card>
    )
  }

}

export default LoginPage
