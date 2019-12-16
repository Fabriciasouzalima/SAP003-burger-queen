import React from 'react'

function Input(props) {
  return (
    <input
      className={props.class}
      placeholder={props.placeholder}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
}
  
  export default Input;