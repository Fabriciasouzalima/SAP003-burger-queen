import React from "react";

function Button(props) {
  return (
    <button
      className={props.className}
      onClick={props.handleClick}
      disabled={props.disabled}
      id={props.id}
    >
      {props.children}
    </button>
  );
}

export default Button;
