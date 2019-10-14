export const MOVE = "MOVE";
export const RESTART = "RESTART";
export const HISTORY = "HISTORY";
export const SORT = "SORT";


export const move = (pos) => {
  return {
    type: "MOVE",
    pos
  }
}

export const restart = () => {
  return {
    type: "RESTART"
  }
}


export const sort = () => {
  return {
    type: "SORT"
  }
}

export const history = () => {
  return {
    type: "HISTORY"
  }
}
