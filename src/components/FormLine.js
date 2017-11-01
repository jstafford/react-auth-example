import React, {Component} from 'react'

class FormLine extends Component<{}> {
  render() {
    const {children} = this.props
    return (
      <div style={{
        padding: '16px',
      }}>
        {children}
      </div>
    )
  }
}

export default FormLine
