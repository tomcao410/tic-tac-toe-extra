import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import Board from './Board';
import * as actionTypes from '../actions/gameActions';
import { userActions } from '../actions/userActions';



const boardSize = 20;

// -------------GAME-------------
class Game extends React.Component
{

  componentWillUpdate(bot) {
    if (!bot.xIsNext)
    {
      var min = 0;
      var max = boardSize * boardSize - 1;
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      const {history} = bot;
      const current = history[bot.stepNumber];
      while (current.squares[rand] !== null)
      {
        rand = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      this.props.onMove(rand);
    }
  }

  jumpTo(step) {
    this.props.onHistory(step);
  }

  render()
  {
    if (localStorage.getItem('user') === null) {
      if (window.confirm("You need to login first!"))
      {
        window.location.replace('/user');
        return;
      }
    }
    const {history} = this.props;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(this.props.currentClick, current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Move #${  move  }- (col: ${  history[move].pastCol  }, row: ${  history[move].pastRow  })` :
        'Game start!';
        return (
          <li key={move.id}>
            <button
              type="button"
              className={`${move % 2 === 0 ? 'custom-history-button' : 'btn-warning'}`}
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
      // status = `Next player: ${  this.props.xIsNext ? 'X' : 'O'}`;
      status = "Your tick: X";
    }

    return (
      <div className="App">

        <header className="App-header">
          <table className="custom-table">
            <td align="left">
              <span>Welcome to Tic-Tac-Toe Vietnamese version</span>
            </td>
            <td align="right">
              {/* <a
                href="/profile"
                className="custom-profile-button">
                Profile
              </a> */}
              <button
                type="button"
                className="custom-logout-button"
                onClick={() => this.props.logout()}>
                Logout
              </button>
            </td>
          </table>
          <div className="line"/>
          <strong>RULE: Who hits 5 without being block at the 2 ends first is the WINNER!</strong>
        </header>

        <body className="App-body">
          <div>{status}</div>
          <table>
            <td className="td-table">
            <Board
              squares={current.squares}
              onClick={(i) => this.props.onMove(i)}
            />
            </td>

            <td className="td-table">
              {/* <tr>
                <button
                  type="button"
                  className="btn-primary"

                  onClick={() => this.props.onSort()}>
                  Sort history: {this.props.isDescending ? "Descending" : "Ascending"}
                </button>
              </tr> */}
              <tr>
              History menu (scrollable):
                <div className="vertical-menu">{this.props.isDescending ? moves : moves.reverse()}</div>
              </tr>
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
    },
    logout: userActions.logout
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
