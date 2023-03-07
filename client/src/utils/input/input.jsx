import React from "react";
import "./input.less";

const Input = (props) => {
  return (
    <input
      onChange={(e) => props.setValue(e.target.value)}
      value={props.value}
      autoComplete={`new-${props.type}`}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
