import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import File from "./file/File";

import "./filelist.less";

const FileList = () => {
  const files = useSelector((state) => state.files.files);

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__data">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={"file"}
            exit={false}
          >
            <File file={file} key={file._id} />;
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default FileList;
