import React, { useState } from "react";
import "./input.less";
import visibleIcon from "../../assets/img/invisible-icon.png";

const Input = (props) => {
  const [typeInput, setTypeInput] = useState(props.type);

  return (
    <form className="input-form">
      <input
        className="input-form__input"
        onChange={(e) => props.setValue(e.target.value)}
        value={props.value}
        type={typeInput}
        placeholder={props.placeholder}
      />
      {props.type === "password" && (
        <img
          onClick={() =>
            setTypeInput((prev) => {
              if (prev === props.type) {
                return "text";
              }
              return props.type;
            })
          }
          src={visibleIcon}
          alt="visible-icon"
          className="input-form__icon"
        />
      )}
    </form>
  );
};

export default Input;
