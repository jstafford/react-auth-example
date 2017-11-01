import React, {Component} from 'react'
import {Card, CardTitle} from 'material-ui/Card'

class PublicPage extends Component < {} > {

  render() {
    return (
      <Card className='container'>
        <CardTitle
            title='Public Page'
            subtitle='This page is always accessible, logged in or not.'/>
      </Card>
    )
  }
}

export default PublicPage
