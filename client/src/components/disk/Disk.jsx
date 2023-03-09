import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/Filelist";
import "./disk.less";
import Popup from "./Popup";
import { setCurrentDir, setPopupFile } from "../../reduser/fileReduser";
import Uploader from "./fileList/uploader/Uploader";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="disk__select"
        >
          <option value="name">По имени</option>
          <option value="type">По типу</option>
          <option value="date">По дате</option>
          <option value="none">Без сортировки</option>
        </select>
      </div>
      <FileList />
      <Popup />
      <Uploader />
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
