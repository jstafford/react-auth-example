import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Base from './Base'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import './style.css'

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <Base>
            <Switch>
              <Route exact={true} path='/' component={HomePage}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
            </Switch>
          </Base>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
