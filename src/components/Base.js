import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import auth from '../modules/auth'

class Base extends Component<{}> {
  render() {
    const {children} = this.props
    const loggedIn = auth.isUserAuthenticated()
    return (
      <div style={{
        fontSize: '16px',
        margin: 0,
      }}>
        <AppBar
          title=''
          iconElementLeft={<Link to='/'>React Auth Example</Link>}
          iconElementRight={loggedIn
            ? <Link
                to='/'
                onClick={() => {auth.deauthenticateUser()}}
              >Log out</Link>
            : <span>
                <Link to={{
                  pathname: '/login',
                  state: { fromPathname: window.location.pathname }
                }}>Log in</Link> / <Link to='/signup'>Sign up</Link>
              </span>
          }
        />
        {children}
      </div>
    )
  }
}

export default Base
