import React from 'react'
import './App.css'
import Board from './board'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    }
    this.handleClick = this.handleClick.bind(this)
    this.calculateWinner = this.calculateWinner.bind(this)
    this.jumpTo = this.jumpTo.bind(this)
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }
  calculateWinner(squares) {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < line.length; i++) {
      const [a, b, c] = line[i]

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : '0'
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares)
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game Start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    let status
    if (winner) {
      status = `Winner : ${winner}`
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : '0'}`
    }
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default App
