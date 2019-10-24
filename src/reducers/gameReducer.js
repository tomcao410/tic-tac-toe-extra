import * as actionTypes from '../actions/gameActions'
import { calculateWinner } from '../components/Game'

const boardSize = 20;

const initState = {
  history: [{
    squares: Array(boardSize * boardSize).fill(null),
    pastCol: null,
    pastRow: null
  }],
  stepNumber: 0,
  xIsNext: true,
  currentClick: null,
  isDescending: true,
}

  const rootReducer = (state = initState, action) => {

  switch (action.type) {
    case actionTypes.MOVE:
      {
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];

        const squares = current.squares.slice();

        if (calculateWinner(state.currentClick, squares) || squares[action.pos]) {
          return state;
        }

        squares[action.pos] = state.xIsNext ? 'X' : 'O';

        return {
          ...state,
          history: history.concat([{
            squares,
            pastCol: (action.pos % 20) + 1,
            pastRow: Math.floor(action.pos / 20) + 1,
          }]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext,
          currentClick: action.pos
        };
      }
    case actionTypes.HISTORY:
      {
        return {
          ...state,
          stepNumber: action.step,
          xIsNext: (action.step % 2) === 0
        };
      }
    case actionTypes.SORT:
      {
        return {
          ...state,
          isDescending: !state.isDescending
        };
      }
    default:
      return state;
  }
}

//----------------------------------------------------

export default rootReducer;
