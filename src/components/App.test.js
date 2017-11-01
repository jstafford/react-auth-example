import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {LocalStorage} from 'node-localstorage'
global.localStorage = new LocalStorage('./.fileStore')
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App/>, div)
})
