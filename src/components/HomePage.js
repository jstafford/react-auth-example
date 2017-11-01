import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import auth from '../modules/auth'
import {Card, CardTitle, CardText} from 'material-ui/Card'

class HomePage extends Component < {} > {
  state = {
    secretData: ''
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    if (auth.isUserAuthenticated()) {
      const xhr = new XMLHttpRequest()
      xhr.open('get', 'http://localhost:4000/api/dashboard')
      xhr.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${auth.getToken()}`)
      xhr.responseType = 'json'
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.setState({secretData: xhr.response.message})
        }
      })
      xhr.send()
    }
  }

  render() {
    const {secretData} = this.state
    const loggedIn = auth.isUserAuthenticated()
    const loggedOut = !loggedIn
    return (
      <Card className='container'>
        {
          loggedIn && <CardTitle
              title='Dashboard'
              subtitle='You should get access to this page only after authentication.'/>
        }
        {
          loggedOut && <CardTitle
              title='React Auth Example'
              subtitle='This is the home page.'/>
        }
        {
          loggedIn && secretData && <CardText
              style={{
                fontSize: '16px',
                color: 'green'
              }}>{secretData}</CardText>
        }
        <CardText><Link to='/public'>Public Page</Link>&emsp;&emsp;&emsp;<Link to='/protected'>Protected Page</Link></CardText>
      </Card>
    )
  }
}

export default HomePage
