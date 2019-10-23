export const MOVE = "MOVE";
export const HISTORY = "HISTORY";
export const SORT = "SORT";


export const move = (pos) => {
  return {
    type: MOVE,
    pos
  }
}

export const sort = () => {
  return {
    type: SORT
  }
}

export const history = (step) => {
  return {
    type: HISTORY,
    step
  }
}
