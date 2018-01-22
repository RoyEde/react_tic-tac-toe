import React, { Component } from 'react'
export default class extends Component {
  handleClick(v) {
    this.props.handleChoice(v)
  }

  handleChange(v) {
    this.props.handleChange(v.target.value)
  }

  handleConfirm() {
    this.props.chosen === null && this.props.mode !== 2 ?
    alert("Please choose!") :
    this.props.handleConfirm()
  }

  render() {
    const mode = this.props.mode
    const chosen = this.props.chosen
    return (
      <div className="overlay">
        <div className="start appear">
          <p className="start-title">Choose your side!</p>
          <div className="choose">
            <button
              onClick={ () => this.handleClick(true) }
              className={ `X start-btn btn ${mode !== 2 ? "appear" : "hide"}-quick
              ${chosen !== null ? (chosen ? "chosen" : "") : "" }` }
            >
              X
            </button>
            <button
              onClick={ () => this.handleClick(false) }
              className={ `O start-btn btn ${mode !== 2 ? "appear" : "hide"}-quick
              ${chosen !== null ? (chosen ? "" : "chosen") : "" }` }
            >
              O
            </button>
          </div>
          <select
            className="type btn"
            onChange={ (v) => this.handleChange(v) }
          >
            <option
              value="0"
              className="opt"
            >
              Machine (Impossible)
            </option>
            <option
              value="1"
              className="opt"
            >
              Machine (Random)
            </option>
            <option
              value="2"
              className="opt"
            >
              1 vs 1
            </option>
          </select>
          <button
            className="confirm-btn btn"
            onClick={ () => this.handleConfirm() }
          >Confirm</button>
        </div>
      </div>
    )
  }
}
