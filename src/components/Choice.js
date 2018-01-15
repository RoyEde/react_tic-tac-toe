import React, { Component } from 'react'

export default class extends Component {
  render() {
    const chosen = this.props.chosen
    return (
      <div className="overlay hide">
        <div className="start">
          <p className="start-title">
            {`You've chosen: ${ chosen !== null ? (chosen  ? "X" : "O") : "1 vs 1"}`}
          </p>
        </div>
      </div>
    )
  }
}
