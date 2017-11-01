import React, {Component} from 'react'
import {CardTitle} from 'material-ui/Card'
import CardContainer from './CardContainer'

class PublicPage extends Component < {} > {

  render() {
    return (
      <CardContainer>
        <CardTitle
            title='Public Page'
            subtitle='This page is always accessible, logged in or not.'/>
      </CardContainer>
    )
  }
}

export default PublicPage
