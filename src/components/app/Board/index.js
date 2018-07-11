import React, { Component } from 'react'
import Square from '../Square'
import { aiPlay, emptyIndexes, randMove, tie, win } from '../logic'

export default class extends Component {
  constructor () {
    super()

    this.state = {
      cells: emptyIndexes(Array(9).fill(null)),
      nextX: true,
      human: null,
      ai: null
    }
  }

  componentWillReceiveProps (n) {
    this.setState({
      human: n.chosen ? 'X' : 'O',
      ai: !n.chosen ? 'X' : 'O'
    })

    if (n.mode < 2 && !n.start) {
      window.setTimeout(() => {
        if (n.mode && !n.chosen) this.play(randMove())
        if (!n.mode && !n.chosen) this.play(4)
      }, 900)
    }
  }

  reset () {
    this.setState({
      cells: emptyIndexes(Array(9).fill(null)),
      nextX: true
    })
    this.props.reset()
  }

  play (v) {
    const state = this.state
    const mode = this.props.mode
    const cells = state.cells.slice()

    if (win(cells, state.human) || win(cells, state.ai) || isNaN(cells[v])) return

    cells[v] = state.nextX ? 'X' : 'O'

    if (mode === 2 || (emptyIndexes(cells).length === 8 && !this.props.chosen)) {
      return this.setState({
        cells: cells,
        nextX: !this.state.nextX
      })
    }

    if (win(cells, state.human) || tie(cells)) {
      return this.setState({
        cells: cells,
        nextX: !state.nextX
      })
    }

    let move

    if (mode === 1) {
      move = randMove()

      while (isNaN(cells[move])) move = randMove()

      cells[move] = !state.nextX ? 'X' : 'O'
    }

    if (mode === 0) {
      move = aiPlay(cells, state.ai, state.human)
      cells[move] = !state.nextX ? 'X' : 'O'
    }

    this.setState({
      cells: cells
    })
  }

  render () {
    const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    const cells = this.state.cells
    const player = !this.state.nextX ? 'X' : 'O'
    if (win(cells, player) || tie(cells)) {
      window.setTimeout(() => {
        window.alert(`${win(cells, player) ? `${player} won the match!` : 'It\'s a tie!'} \n Reseting...`)
        this.reset()
      }, 1000)
    }
    return (
      <div className='board'>
        <div className='info'>
          <h1>Tic-Tac-Toe</h1>
          <h4 className={!this.props.start ? 'appear' : 'hidden'}>
            {`Mode: ${this.props.mode === 2 ? '1 vs 1' : this.props.mode === 1 ? 'AI-Random' : 'AI-Impossible'}`}
          </h4>
          <h2 className={!this.props.start ? 'appear' : 'hidden'}>
            {`${win(cells, player) ? `Won: ${win(cells, player)}`
              : (tie(cells) ? 'Tied'
                : (`Turn: ${this.state.nextX ? 'X' : 'O'}`))}`}
          </h2>
          <button
            className='reset-btn btn'
            onClick={() => this.reset()}
          >
            Reset
          </button>
        </div>
        <div className='game-container'>
          { board.map(i => (
            <div
              className='row'
              key={i}
            >
              {i.map(j => (
                <Square
                  handleClick={() => this.play(j)}
                  value={
                    /*
                    cells[j]
                    */
                    isNaN(cells[j]) ? cells[j] : ''
                  }
                  key={j}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
