import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Card, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class SignUpPage extends Component {

  // set the initial component state
  state = {
    errors: {},
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
        // success change the component-container state
        this.setState({errors: {}})

        // set a message
        localStorage.setItem('successMessage', xhr.response.message)

        // make a redirect
        this
          .context
          .router
          .replace('/login')
      } else {
        // failure

        const errors = xhr.response.errors
          ? xhr.response.errors
          : {}
        errors.summary = xhr
          .response
          .message

          this
          .setState({errors})
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
    const {errors, user} = this.state
    return (
      <Card className='container'>
        <form action='/' onSubmit={this.onSubmit}>
          <h2 className='card-heading'>Sign Up</h2>

          {errors.summary && <p className='error-message'>{errors.summary}</p>}

          <div className='field-line'>
            <TextField
              floatingLabelText='Name'
              name='name'
              errorText={errors.name}
              onChange={this.onChange}
              value={user.name}/>
          </div>

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
            <RaisedButton
              type='submit'
              label='Create New Account'
              primary />
          </div>

          <CardText>Already have an account? <Link to={'/login'}>Log in</Link>
          </CardText>
        </form>
      </Card>
    )
  }

}

export default SignUpPage
