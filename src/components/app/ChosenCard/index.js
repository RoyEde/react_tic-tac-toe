import React, { Component } from 'react'

export default class extends Component {
  render () {
    const chosen = this.props.chosen
    const mode = this.props.mode
    return (
      <div className='overlay hide'>
        <div className='start'>
          <p className='start-title'>
            {`You've chosen: ${mode !== 2 && chosen !== null ? (chosen ? 'X' : 'O') : '1 vs 1'}`}
          </p>
        </div>
      </div>
    )
  }
}
