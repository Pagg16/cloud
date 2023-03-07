import React from "react";
import { useSelector } from "react-redux";
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
      {files.map((file) => {
        return <File file={file} key={file._id} />;
      })}
    </div>
  );
};

export default FileList;
