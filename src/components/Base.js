import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import auth from '../modules/auth'

const LogOut = withRouter(({history}) => (
  <a
    onClick={() => {
      auth.deauthenticateUser()
      history.push('/')
    }}>Log out</a>
))

class Base extends Component < {} > {
  render() {
    const {children} = this.props
    const loggedIn = auth.isUserAuthenticated()
    return (
      <div>
        <AppBar
          title=''
          iconElementLeft={<Link to = '/' > React Auth Example</Link>}
          iconElementRight={loggedIn
            ? <LogOut/>
            : <span>
                <Link to='/login'>Log in</Link> / <Link to='/signup'>Sign up</Link>
              </span>
          }
        />
        {children}
      </div>
    )
  }
}

export default Base
