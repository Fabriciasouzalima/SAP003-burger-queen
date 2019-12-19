import React from 'react';
import { Input, Col } from 'reactstrap';

function Radio(props) {
  return (
    <Col>
      <Input
        type="radio"
        onChange={props.onChange}
        title={props.name}
        value={props.value}
        name={props.name}
        id={props.options[''].title}
        defaultChecked
      />
      {props.text}
    </Col>
  );
}

export default Radio;

