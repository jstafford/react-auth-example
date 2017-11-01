import React, {Component} from 'react'
import {Card} from 'material-ui/Card'

class CardContainer extends Component<{}> {
  render() {
    const {children} = this.props
    return (
      <Card style={{
        margin: '0 auto',
        textAlign: 'center',
        width: '700px',
      }}>
        {children}
      </Card>
    )
  }
}

export default CardContainer
