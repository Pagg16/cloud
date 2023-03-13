import React from "react";
import "./file.less";
import "../../../../utils/theme.less";
import downloadIcon from "../../../../assets/img/download-icon.svg";
import deleteIcons from "../../../../assets/img/icons-delete.png";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushDirStack, setCurrentDir } from "../../../../reduser/fileReduser";
import { deleteFile, downloadfile } from "../../../../actions/file";
import sizeFormat from "../../../../utils//sizeFormat";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.view);
  const theme = useSelector((state) => state.app.theme);

  const downloadBts = (
    <button
      onClick={(e) => downloadClickHandler(e)}
      className={`file__btn file__download ${
        theme === "dark" ? "theme-text" : ""
      }`}
    >
      <img
        src={downloadIcon}
        alt="download-icon"
        className="file__download-icon file-plate__download-icon"
      />
    </button>
  );

  const deleteBts = (
    <>
      <button
        onClick={(e) => deleteClickHandler(e)}
        className={`file__btn file__delete ${
          theme === "dark" ? "theme-text" : ""
        }`}
      >
        delete
      </button>
      <img
        onClick={(e) => deleteClickHandler(e)}
        className="file__delete-icon"
        src={deleteIcons}
        alt="delete-icon"
      />
    </>
  );

  function openDirHandler(file) {
    if (file.type === "dir") {
      dispatch(pushDirStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(e) {
    e.stopPropagation();
    downloadfile(file);
  }

  function deleteClickHandler(e) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }

  if (fileView === "list") {
    return (
      <div onClick={() => openDirHandler(file)} className="file">
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
          className="file__img"
        />
        <div className={`file__name ${theme === "dark" ? "theme-text" : ""}`}>
          {file.name}
        </div>
        <div
          className={`file__date file_width-visible  ${
            theme === "dark" ? "theme-text" : ""
          }`}
        >
          {file.date.slice(0, 10)}
        </div>
        <div
          className={`file__size file_width-visible  ${
            theme === "dark" ? "theme-text" : ""
          }`}
        >
          {sizeFormat(file.size)}
        </div>
        {file.type !== "dir" && downloadBts}
        {deleteBts}
      </div>
    );
  }

  return (
    <div onClick={() => openDirHandler(file)} className="file-plate">
      <img
        src={file.type === "dir" ? dirLogo : fileLogo}
        alt=""
        className="file-plate__img"
      />
      <div
        className={`file-plate__name ${theme === "dark" ? "theme-text" : ""}`}
      >
        {file.name}
      </div>
      <div className="file-plate__btns file_width-visible">
        {file.type !== "dir" && downloadBts}
        {deleteBts}
      </div>
    </div>
  );
};

export default File;
