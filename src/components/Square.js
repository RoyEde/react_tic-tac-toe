import React, { Component } from 'react'

export default class extends Component {
  handleClick() {
    this.props.handleClick()
  }

  render() {
    return (
      <button
        onClick={() => this.handleClick()}
        className={ `square btn ${this.props.value}` }
      >
        { this.props.value }
      </button>
    )
  }
}
