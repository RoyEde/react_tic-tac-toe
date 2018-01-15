import React, { Component } from 'react'
import Square from './Square'

export default class extends Component {
  constructor() {
    super()

    this.state = {
      cells: Array(9).fill(null),
      nextX: true
    }
  }

  handleClick(v) {
    const state = this.state
    const cells = state.cells.slice()
    cells[v] = state.nextX ? "X" : "O"
    this.setState({cells: cells})
  }

  render() {
    const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    return(
      <div className="board">
        <h1>Tic-Tac-Toe</h1>
        { board.map(i => (
          <div
            className="row"
            key={ i }
          >
            {i.map(j => (
              <Square
                handleClick={ () => this.handleClick(j) }
                value={ this.state.cells[j] }
                key={ j }
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}
