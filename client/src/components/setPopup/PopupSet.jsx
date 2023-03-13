import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PopupSet.less";
import { hideSetPopup } from "../../reduser/appReduser";
import ButtonClose from "../../utils/buttonClose/ButtonClose";

const PopupSet = ({
  CreateDir,
  uploadFileCompotent,
  changeTypeSort,
  ChangeBtsColor,
}) => {
  const isOpenSetPopup = useSelector((state) => state.app.setPopup);
  const dispatch = useDispatch();

  function close() {
    dispatch(hideSetPopup());
  }

  return (
    <div className={`setPopup  ${isOpenSetPopup && "setPopup_visible"}`}>
      <div className="setPopup__container">
        <ButtonClose close={close} />
        <div className="setPopup__search-container">
          CLOUD{" "}
          <div className="setPopup__exit-button">
            {window.exitButtonComponent}
          </div>
        </div>
        {CreateDir}
        {uploadFileCompotent}
        <ChangeBtsColor />
        {changeTypeSort}
      </div>
    </div>
  );
};

export default PopupSet;
