import * as actionTypes from '../actions/actions'

const boardSize = 20;

const initState = {
  history: [{
    squares: Array(boardSize * boardSize).fill(null),
    pastCol: null,
    pastRow: null,
  }],
  stepNumber: 0,
  xIsNext: true,
  currentClick: null,
  isDescending: true,
}

const rootReducer = (state = initState, action) => {

  switch (action.type) {
    case actionTypes.MOVE:
    
      break;
    case actionTypes.RESTART:

      break;
    case actionTypes.HISTORY:

      break;
    case actionTypes.SORT:

      break;
    default:
      return state;
  }
  return state;
}

//----------------------------------------------------

export default rootReducer;

//----------------------------------------------------

// Caculate who is the winner
function calculateWinner(currentSquare, squares)
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
