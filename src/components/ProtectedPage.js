import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {CardTitle} from 'material-ui/Card'
import auth from '../modules/auth'
import CardContainer from './CardContainer'

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
      <CardContainer>
        <CardTitle
          title='Protected Page'
          subtitle='This page now accessible since you are logged in.'
        />
      </CardContainer>
    )
  }
}

export default ProtectedPage
