import React from 'react';
import PropTypes from 'prop-types'; 


Filedset.propTypes = {
    options: PropTypes.array,
    title: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
} 

const Fieldset = props => {
  return (
    <fieldset className={container}>
      <legend className={legend}>{props.title}:</legend>
      <div className={option}>
        <input
          onChange={props.onChange}
          className={props.className}
          type="radio"
          name={props.name}
          id={props.options[0].title}
          defaultChecked
        ></input>
        <label htmlFor={props.options[0].title}>
          {props.options[0].title} {props.options[0].price}
        </label>
      </div>
      <div className={option}>
        <input
          onChange={props.onChange}
          className={props.className}
          type="radio"
          name={props.name}
          id={props.options[1].title}
          defaultChecked
        ></input>
        <label htmlFor={props.options[1].title}>
          {props.options[1].title} {props.options[1].price}
        </label>
      </div>
      <div className={option}>
        <input
          onChange={props.onChange}
          className={props.className}
          type="radio"
          name={props.name}
          id={props.options[2].title}
          defaultChecked
        ></input>
        <label htmlFor={props.options[2].title}>
          {props.options[2].title} {props.options[2].price}
        </label>
      </div>
    </fieldset>
  );
};

export default Fieldset; 