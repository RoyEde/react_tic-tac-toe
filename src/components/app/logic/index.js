const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const aiPlay = (cells, ai, human) => {
  const available = emptyIndexes(cells)
  const pattern = [4, 0, 8, 2, 6, 1, 5, 7, 3].filter(v => available.indexOf(v) !== -1)

  if (specialMove(cells, ai, available) !== false) return specialMove(cells, ai, available)

  if (specialMove(cells, human, available) !== false) return specialMove(cells, human, available)

  // check for loopholes in the strategy
  if (loophole(cells, human, available)) return loophole(cells, human, available)

  return pattern[0]
}

const specialMove = (cells, player, available) => {
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i]
    if (cells[b] === player && cells[b] === cells[c] && available.indexOf(a) !== -1) return a
    if (cells[c] === player && cells[c] === cells[a] && available.indexOf(b) !== -1) return b
    if (cells[a] === player && cells[a] === cells[b] && available.indexOf(c) !== -1) return c
  }
  return false
}

const loophole = (cells, player, available) => {
  const holes = [[5, 6, 1], [2, 6, 1], [0, 8, 7], [5, 7, 2], [2, 7, 3]] // list of loopholes and solutions. This will be updated.

  for (let i = 0; i < holes.length; i++) {
    if (cells[holes[i][0]] === player &&
      cells[holes[i][1]] === player &&
      available.length === 6 &&
      available.indexOf(holes[i][2] !== -1)) return holes[i][2]
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
  for (let i = 0; i < cells.length; i++) {
    if (!isNaN(cells[i])) return false
  }

  return true
}

const randMove = () => Math.floor((Math.random() * 9))

const emptyIndexes = (cells) => cells.map((v, i) => v !== null ? v : i).filter(s => !isNaN(s))

export { aiPlay, emptyIndexes, randMove, tie, win }
