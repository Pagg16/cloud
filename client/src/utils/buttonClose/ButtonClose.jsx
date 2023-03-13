import React from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "../../assets/img/close.png";
import "./buttonClose.less";

const ButtonClose = ({ close }) => {
  const dispatch = useDispatch();

  return (
    <button onClick={close} className="button">
      <img
        src={CloseIcon}
        className="button__close-icon"
        alt="close-icon"
      ></img>
    </button>
  );
};

export default ButtonClose;
