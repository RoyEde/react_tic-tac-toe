import React, { Component } from 'react'

export default class extends Component {
  handleClick() {
    this.props.handleClick()
  }

  render() {
    return (
      <button
        onClick={() => this.handleClick()}
        className="square"
      >
        { this.props.value }
      </button>
    )
  }
}
