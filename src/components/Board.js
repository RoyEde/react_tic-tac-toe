import React, { Component } from 'react'
import Square from './Square'

export default class extends Component {
  constructor() {
    super()

    this.state = {
      cells: emptyIndexes(Array(9).fill(null)),
      nextX: true,
      human: null,
      ai: null,
    }
  }

  componentWillReceiveProps(n) {
    this.setState({
      human: n.chosen ? "X" : "O",
      ai: !n.chosen ? "X" : "O",
    })

    if(n.mode < 2 && !n.start) {
      if(n.mode && !n.chosen)
      this.play(randMove())
      if(!n.mode && !n.chosen)
      this.play(4)
    }
  }

  reset() {
    this.setState({
      cells: emptyIndexes(Array(9).fill(null)),
      nextX: true
    })
    this.props.reset()
  }

  play(v) {
    const state = this.state
    const mode = this.props.mode
    const cells = state.cells.slice()

    if(win(cells, state.human) || win(cells, state.ai) || isNaN(cells[v]))
    return

    cells[v] = state.nextX ? "X" : "O"

    if(mode === 2 ||
      (emptyIndexes(cells).length === 8 && !this.props.chosen)
    )
    return this.setState({
      cells: cells,
      nextX: !this.state.nextX,
    })

    if(win(cells, state.human) || tie(cells))
    return this.setState({
      cells: cells,
      nextX: !state.nextX
    })

    let move
    if(mode === 1) {
      move = randMove()
      while(isNaN(cells[move]))
      move = randMove()
      cells[move] = !state.nextX ? "X" : "O"
    }

    if(mode === 0) {
      move = aiPlay(cells, state.ai, state.human)
      cells[move] = !state.nextX ? "X" : "O"
    }

    this.setState({
      cells: cells,
    })
  }

  render() {
    const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    const cells = this.state.cells
    const player = !this.state.nextX ? "X" : "O"
    return (
      <div className="board">
        <h1>Tic-Tac-Toe</h1>
        <h2>
          { `${win(cells, player) ? `Won: ${win(cells, player)}` :
          (tie(cells) ? "Tied" :
          (`Turn: ${this.state.nextX ? "X" : "O"}`)) }`}
        </h2>
        <button
          className="reset-btn btn"
          onClick={ () => this.reset() }
        >
          Reset
        </button>
        { board.map(i => (
          <div
            className="row"
            key={ i }
          >
            {i.map(j => (
              <Square
                handleClick={ () => this.play(j) }
                value={
                  /*
                  cells[j]
                  */
                  isNaN(cells[j]) ? cells[j] : ""
                }
                key={ j }
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const loophole = (cells, player, available) => {
  const holes = [[5, 6, 1]] // list of loopholes and solutions

  for(let i = 0; i < holes.length; i++)
  if(cells[holes[i][0]] === player && cells[holes[i][1]] === player && available.length === 6 && available.indexOf(holes[i][2] !== -1))
  return holes[i][2]

  return false
}

const aiPlay = (cells, ai, human) => {
  const available = emptyIndexes(cells)
  const pattern = [4, 0, 8, 2, 6, 1, 5, 7, 3].filter(v => available.indexOf(v) !== -1)

  if(specialMove(cells, ai, available) !== false)
  return specialMove(cells, ai, available)

  if(specialMove(cells, human, available) !== false)
  return specialMove(cells, human, available)

  if(loophole(cells, human, available)) // check for loopholes in the strategy
  return loophole(cells, human, available)

  return pattern[0]
}

const specialMove = (cells, player, available) => {
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i]
    if (cells[b] === player && cells[b] === cells[c] && available.indexOf(a) !== -1)
    return a
    if (cells[c] === player && cells[c] === cells[a] && available.indexOf(b) !== -1)
    return b
    if (cells[a] === player && cells[a] === cells[b] && available.indexOf(c) !== -1)
    return c
  }
  return false
}

const win = (cells, player) => {
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i]
    if (cells[a] === player && cells[a] === cells[b] && cells[a] === cells[c]) {
      return player
    }
  }
  return false
}

const tie = (cells) => {
  for(let i = 0; i < cells.length; i++)
  if(!isNaN(cells[i]))
  return false

  return true
}

const randMove = () => Math.floor((Math.random() * 9))

const emptyIndexes = (cells) => cells.map((v, i) => v ? v : i).filter(s => !isNaN(s))
