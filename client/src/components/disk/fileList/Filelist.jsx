import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import File from "./file/File";

import "./filelist.less";
import "../../../utils/theme.less";

const FileList = () => {
  const files = useSelector((state) => state.files.files);
  const fileView = useSelector((state) => state.files.view);
  const theme = useSelector((state) => state.app.theme);

  if (files.length === 0) {
    return <div className="no-file">Файлы не найдены</div>;
  }

  if (fileView === "list") {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div
            className={`filelist__name ${theme === "dark" ? "theme-text" : ""}`}
          >
            Название
          </div>
          <div
            className={`filelist__date ${theme === "dark" ? "theme-text" : ""}`}
          >
            Дата
          </div>
          <div
            className={`filelist__size ${theme === "dark" ? "theme-text" : ""}`}
          >
            Размер
          </div>
        </div>
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={"file"}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }

  return (
    <div className="filePlate">
      {files.map((file) => (
        <File file={file} key={file._id} />
      ))}
    </div>
  );
};

export default FileList;
