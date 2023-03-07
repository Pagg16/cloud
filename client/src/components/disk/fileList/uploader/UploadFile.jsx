import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../../reduser/uploadReduser";
import "./uploader.less";

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();
  const uploadBar = useRef("");

  useEffect(() => {
    uploadBar.current.width = file.progress + "%";
  }, []);

  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{file.name}</div>
        <button
          onClick={() => dispatch(removeUploadFile(file.id))}
          className="upload-file__remove"
        >
          X
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div ref={uploadBar} className="upload-file__upload-bar"></div>
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
