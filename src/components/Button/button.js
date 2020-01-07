import React from 'react';

function Button(props) {
  return (
    <button className={props.class} onClick={props.handleClick} disabled={props.disabled}>
      {props.title} 
    </button>
  );
}

export default Button 