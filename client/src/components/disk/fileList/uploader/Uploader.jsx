import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../../reduser/uploadReduser";
import UploadFile from "./UploadFile";
import "./uploader.less";

const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const isVisible = useSelector((state) => state.upload.isVisible);
  const dispatch = useDispatch();

  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title"></div>
          <button
            onClick={() => dispatch(hideUploader())}
            className="uploader__close"
          >
            X
          </button>
        </div>
        {files.map((file) => {
          return <UploadFile file={file} key={file.id} />;
        })}
      </div>
    )
  );
};

export default Uploader;
