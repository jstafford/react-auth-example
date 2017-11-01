import React, {Component} from 'react'

class CardHeading extends Component<{}> {
  render() {
    const {children} = this.props
    return (
      <h2 style={{
        padding: '16px',
      }}>
        {children}
      </h2>
    )
  }
}

export default CardHeading
