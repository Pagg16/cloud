import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/Filelist";
import "./disk.less";
import Popup from "./Popup";
import { setCurrentDir, setPopupFile } from "../../reduser/fileReduser";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState();

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

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
    console.log(files);
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
    console.log(files);
    files.forEach((file) => dispatch(uploadFile(currentDir, file)));
    setDragEnter(false);
  }

  return !dragEnter ? (
    <div
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      className="disk"
    >
      <div className="disk__btns">
        <button onClick={() => backHandler()} className="disk__back">
          Назад
        </button>
        <button className="disk__create" onClick={() => showPopupCreated()}>
          Создать папку
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
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
      <FileList />
      <Popup />
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
