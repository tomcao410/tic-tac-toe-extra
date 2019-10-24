import React from 'react';

import { connect } from 'react-redux';

import logo from '../logo.svg';
import '../App.css';
import Board from './Board';
import * as actionTypes from '../actions/gameActions';




const boardSize = 20;

// -------------GAME-------------
class Game extends React.Component
{

  jumpTo(step) {
    this.props.onHistory(step);
  }

  render()
  {
    const {history} = this.props;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(this.props.currentClick, current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to #${  move  }- (col: ${  history[move].pastCol  }, row: ${  history[move].pastRow  })` :
        'Go to game start';
        return (
          <li key={move.id}>
            <button
              type="button"
              onClick={() => this.jumpTo(move)}>
              {move === this.props.stepNumber ? <b>{desc}</b> : desc}
            </button>
          </li>
        )
    });

    let status;
    if (winner) {
      status = `Winner: ${ winner.player }`;
    } else {
      status = `Next player: ${  this.props.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to <strong>Tic-Tac-Toe</strong> Vietnamese version!
          </p>
          <div className="line">
            <strong>RULE: </strong>
            Who hits 5 without being block at the 2 ends first is the WINNER!
            <div className="line" />
          </div>
        </header>

        <body className="App-body">
          <div>{status}</div>
          <table>
            <td >
            <Board
              squares={current.squares}
              onClick={(i) => this.props.onMove(i)}
            />
            </td>
            <button
              type="button"
              onClick={() => this.props.onSort()}>
              Sort by: {this.props.isDescending ? "Descending" : "Ascending"}
            </button>

            <td>
            Scrolling menu:
              <div className="vertical-menu">{this.props.isDescending ? moves : moves.reverse()}</div>
            </td>
          </table>
        </body>

      </div>
    );
  }
}
//----------------------------------------------------

const mapStateToProps = state => {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    currentClick: state.currentClick,
    isDescending: state.isDescending
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMove: (pos) => {
      dispatch(actionTypes.move(pos));
    },
    onSort: () => {
      dispatch(actionTypes.sort());
    },
    onHistory: (step) => {
      dispatch(actionTypes.history(step));
    }
  }
}

//----------------------------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(Game);

//----------------------------------------------------

// Caculate who is the winner
export function calculateWinner(currentSquare, squares)
{
  if (horizontalLine(currentSquare, squares))
  {
    return horizontalLine(currentSquare, squares);
  }
  if (verticalLine(currentSquare, squares))
  {
    return verticalLine(currentSquare, squares);
  }
  if (slashLine(currentSquare, squares))
  {
    return slashLine(currentSquare, squares);
  }
  if (backSlashLine(currentSquare, squares))
  {
    return backSlashLine(currentSquare, squares);
  }
  return false;
}

// Horizontal line (left + right)
function horizontalLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + 1],
      squares[currentSquare + 2], squares[currentSquare + 3],
      squares[currentSquare + 4], squares[currentSquare + 5], squares[currentSquare - 1]],
    [squares[currentSquare], squares[currentSquare - 1],
      squares[currentSquare - 2], squares[currentSquare - 3],
      squares[currentSquare - 4], squares[currentSquare - 5], squares[currentSquare + 1]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f, g] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && ((a === f || f === null) || (a === g || g === null)))
      {
        return {player: a, line: [a, b, c, d, e]};
      }
  }
  return false;
}

// Vertical line (up + down)
function verticalLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + boardSize],
      squares[currentSquare + boardSize * 2], squares[currentSquare + boardSize * 3],
      squares[currentSquare + boardSize * 4], squares[currentSquare + boardSize * 5], squares[currentSquare - boardSize]],
    [squares[currentSquare], squares[currentSquare - boardSize],
      squares[currentSquare - boardSize * 2], squares[currentSquare - boardSize * 3],
      squares[currentSquare - boardSize * 4], squares[currentSquare - boardSize * 5], squares[currentSquare + boardSize]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f, g] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && ((a === f || f === null) || (a === g || g === null)))
      {
        return {player: a, line: [a, b, c, d, e]};
      }
  }
  return false;
}

// Slash line
function slashLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + boardSize + 1],
      squares[currentSquare + (boardSize * 2) + 2], squares[currentSquare + (boardSize * 3) + 3],
      squares[currentSquare + (boardSize * 4) + 4], squares[currentSquare + (boardSize * 5) + 5], squares[currentSquare - boardSize - 1]],
    [squares[currentSquare], squares[currentSquare - boardSize - 1],
      squares[currentSquare - (boardSize * 2) - 2], squares[currentSquare - (boardSize * 3) - 3],
      squares[currentSquare - (boardSize * 4) - 4], squares[currentSquare - (boardSize * 5) - 5], squares[currentSquare + boardSize + 1]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f, g] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && ((a === f || f === null) || (a === g || g === null)))
      {
        return {player: a, line: [a, b, c, d, e]};
      }
  }
  return false;
}

// Backslash line
function backSlashLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + boardSize - 1],
      squares[currentSquare + (boardSize * 2) - 2], squares[currentSquare + (boardSize * 3) - 3],
      squares[currentSquare + (boardSize * 4) - 4], squares[currentSquare + (boardSize * 5) - 5], squares[currentSquare - boardSize + 1],
      squares[currentSquare - boardSize + 1]],
    [squares[currentSquare], squares[currentSquare - boardSize + 1],
      squares[currentSquare - (boardSize * 2) + 2], squares[currentSquare - (boardSize * 3) + 3],
      squares[currentSquare - (boardSize * 4) + 4], squares[currentSquare - (boardSize * 5) + 5], squares[currentSquare + boardSize - 1],
      squares[currentSquare + boardSize - 1]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f, g] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && ((a === f || f === null) || (a === g || g === null)))
      {
        return {player: a, line: [a, b, c, d, e]};
      }
  }
  return false;
}
