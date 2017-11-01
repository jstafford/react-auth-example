import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Card, CardTitle} from 'material-ui/Card'
import auth from '../modules/auth'

class ProtectedPage extends Component < {} > {

  render() {
    const loggedIn = auth.isUserAuthenticated()

    if (!loggedIn) {
      return (
        <Redirect to={{
          pathname: '/login',
          state: { fromPathname: window.location.pathname }
        }}/>
      )
    }

    return (
      <Card className='container'>
        <CardTitle
            title='Protected Page'
            subtitle='This page is only accessible once you have logged in.'/>
      </Card>
    )
  }
}

export default ProtectedPage
