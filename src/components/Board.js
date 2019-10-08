import React from 'react';
import Square from './Square';

const boardSize = 20;


// -------------BOARD-------------
class Board extends React.Component
{
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [];

    for (var i = 0; i < boardSize; i++)
    {
      let row = [];
      for (var j = 0; j < boardSize; j++)
      {
        row.push(this.renderSquare(i * boardSize + j))
      }
      board.push(
        <div className="board-row">
          {row}
        </div>
      )
    }

    return (
      <div>
        <div />
            <div className="board">
              {board}
          </div>
      </div>
    );
  }
}

export default Board;
