import React, { Component } from 'react'

export default class extends Component {
  handleClick () {
    this.props.handleClick()
  }

  render () {
    const value = this.props.value
    return (
      <button
        onClick={() => this.handleClick()}
        className={`square btn ${value}`}
      >
        <span className={`${value ? 'appear-quick' : 'hidden'}`}>{ value }</span>
      </button>
    )
  }
}
