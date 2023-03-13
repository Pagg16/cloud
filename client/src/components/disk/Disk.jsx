import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/Filelist";
import backLogo from "../../assets/img/back-button.svg";
import addDir from "../../assets/img/add-dir.svg";
import "./disk.less";
import "../../utils/theme.less";
import Popup from "./Popup";
import {
  setCurrentDir,
  setFileView,
  setPopupFile,
} from "../../reduser/fileReduser";
import Uploader from "./fileList/uploader/Uploader";
import ChangeBtsColor from "./changeBtsColor/ChangeBtsColor";
import PopupSet from "../setPopup/PopupSet";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const theme = useSelector((state) => state.app.theme);
  const loader = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState();
  const [sort, setSort] = useState("none");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function showPopupCreated() {
    dispatch(setPopupFile(true));
  }

  function backHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHendler(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(currentDir, file)));
  }

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(currentDir, file)));
    setDragEnter(false);
  }

  const CreateDir = (
    <div
      onClick={() => showPopupCreated()}
      className={`disk__create-container ${
        theme === "dark" ? "theme-border" : ""
      }`}
    >
      <button
        className={`disk__create ${theme === "dark" ? "theme-text" : ""}`}
      >
        Создать папку
      </button>
      <img src={addDir} alt="create-logo" className="disk__create-logo" />
    </div>
  );

  const uploadFileCompotent = (
    <div
      className={`disk__upload ${
        theme === "dark" ? "theme-border-dashed" : ""
      }`}
    >
      <div className="disk__upload-container">
        <label
          htmlFor="disk__upload-input"
          className={`disk__upload-label ${
            theme === "dark" ? "theme-text" : ""
          }`}
        >
          Загрузить файл
        </label>
        <input
          multiple={true}
          onChange={(event) => fileUploadHendler(event)}
          type="file"
          id="disk__upload-input"
          className="disk__upload-input"
        />
      </div>
    </div>
  );

  const changeTypeSort = (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className={`disk__select ${theme === "dark" ? "theme-text" : ""}`}
    >
      <option value="name">По имени</option>
      <option value="type">По типу</option>
      <option value="date">По дате</option>
      <option value="none">Без сортировки</option>
    </select>
  );

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      className="disk"
    >
      <div onClick={() => backHandler()} className="disk__btns">
        <div className="disk__bts-container-back-create">
          <div
            className={`disk__back-container ${
              theme === "dark" ? "theme-border" : ""
            }`}
          >
            <img src={backLogo} alt="back-logo" className="disk__back-logo" />
            <button
              className={`disk__back ${theme === "dark" ? "theme-text" : ""}`}
            >
              Назад
            </button>
          </div>

          <div className="disk__invisible">{CreateDir}</div>
        </div>
        <div className="disk__invisible">{uploadFileCompotent}</div>
        <div className="disk__change-color">
          <ChangeBtsColor />
        </div>
        <div className="disk__invisible"> {changeTypeSort}</div>
        <div className="disk__type-visible-container">
          <button
            onClick={() => dispatch(setFileView("plate"))}
            className="disk__plate"
          ></button>
          <button
            onClick={() => dispatch(setFileView("list"))}
            className="disk__list"
          ></button>
        </div>
      </div>
      <FileList />
      <Popup />
      <Uploader />
      <PopupSet
        CreateDir={CreateDir}
        uploadFileCompotent={uploadFileCompotent}
        changeTypeSort={changeTypeSort}
        ChangeBtsColor={ChangeBtsColor}
      />
    </div>
  ) : (
    <div
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      className="drop-area"
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
