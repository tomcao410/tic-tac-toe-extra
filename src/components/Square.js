import React from 'react';



// -------------SQUARE-------------
function Square(props) {
  return (
    <button
      type="button"
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
