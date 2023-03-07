import React from "react";
import "./file.less";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushDirStack, setCurrentDir } from "../../../../reduser/fileReduser";
import { deleteFile, downloadfile } from "../../../../actions/file";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  function openDirHandler(file) {
    if (file.type === "dir") {
      dispatch(pushDirStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(e) {
    e.stopPropagination();
    downloadfile(file);
  }

  function deleteClickHandler(e) {
    e.stopPropagination();
    dispatch(deleteFile(file));
  }

  return (
    <div onClick={() => openDirHandler(file)} className="file">
      <img
        src={file.type === "dir" ? dirLogo : fileLogo}
        alt=""
        className="file__img"
      />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
      {file.type !== "dir" && (
        <button
          onClick={() => downloadClickHandler()}
          className="file__btn file__download"
        >
          download
        </button>
      )}
      <button
        onClick={(e) => deleteClickHandler(e)}
        className="file__btn file__delete"
      >
        delete
      </button>
    </div>
  );
};

export default File;
