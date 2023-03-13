import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir } from "../../actions/file";
import { setPopupFile } from "../../reduser/fileReduser";
import ButtonClose from "../../utils/buttonClose/ButtonClose";
import Input from "../../utils/input/input";
import "./disk.less";

const Popup = () => {
  const [dirName, setDirName] = useState("");
  const popupVisible = useSelector((state) => state.files.popupVisible);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();

  function createStaticHandler() {
    dispatch(createDir(currentDir, dirName));
    setDirName("");
    closePopup();
  }

  function closePopup() {
    dispatch(setPopupFile(false));
  }

  return (
    <div
      onClick={() => closePopup()}
      className={`popup ${popupVisible ? "popup_visible" : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="popup__content">
        <ButtonClose close={closePopup} />
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
        </div>
        <Input
          className="input"
          type="text"
          placeholder="Введите название папки"
          value={dirName}
          setValue={setDirName}
        />
        <button onClick={() => createStaticHandler()} className="popup__create">
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
