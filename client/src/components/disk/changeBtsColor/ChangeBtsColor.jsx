import React, { useEffect, useRef, useState } from "react";
import "./changeBtcColor.less";
import "../../../utils/theme.less";
import { arrowRight } from "../../../assets/img/svg.js/arrow-right";

import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../reduser/appReduser";

const ChangeBtsColor = () => {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  const rotateElem = useRef();

  function handleSwitchColor() {
    const color = theme === "dark" ? "white" : "dark";
    dispatch(changeTheme(color));
  }

  return (
    <div
      onClick={handleSwitchColor}
      className={`changeBtsColor ${theme === "dark" ? "theme-text" : ""}`}
    >
      Цвет темы
      <div
        className="changeBtsColor__svg-icon"
        ref={(e) => {
          const svg = e?.querySelector("svg").querySelector("g");
          if (theme === "dark") {
            svg?.setAttribute("fill", "#FFFFFF");
          } else {
            svg?.setAttribute("fill", "#000000");
          }
        }}
      >
        {arrowRight}
      </div>
      <div
        ref={rotateElem}
        className={`changeBtsColor__current-color ${
          theme === "dark" ? "changeBtsColor__current-color_rotate" : ""
        }`}
      ></div>
    </div>
  );
};

export default ChangeBtsColor;
