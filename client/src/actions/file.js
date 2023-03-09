import axios from "axios";
import { hideLoader, showLoader } from "../reduser/appReduser";
import { addFile, deleteFileAction, setFiles } from "../reduser/fileReduser";
import {
  addUploadFile,
  changeUploadFile,
  hideUploader,
  showUploader,
} from "../reduser/uploadReduser";

export function getFiles(dirId, sort) {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      let url = "http://localhost:4000/api/files";

      if (dirId) {
        url = `http://localhost:4000/api/files?parent=${dirId}`;
      }
      if (sort) {
        url = `http://localhost:4000/api/files?sort=${sort}`;
      }

      if (dirId && sort) {
        url = `http://localhost:4000/api/files?parent=${dirId}&sort=${sort}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export function createDir(dirId, name) {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(addFile(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function uploadFile(dirId, file) {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dirId) {
        formData.append("parent", dirId);
      }
      const uploadFile = { name: file.name, progress: 0, id: Date.now() };
      await dispatch(addUploadFile(uploadFile));
      await dispatch(showUploader());
      const response = await axios.post(
        `http://localhost:4000/api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.event.lengthComputable
              ? progressEvent.total
              : false;

            if (totalLength) {
              uploadFile.progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              dispatch(changeUploadFile(uploadFile));
            }
          },
        }
      );
      dispatch(addFile(response.data));
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    } finally {
      dispatch(hideUploader());
    }
  };
}

export async function downloadfile(file) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://localhost:4000/api/files/download?id=${file._id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", downloadUrl);
    link.download = file.name;
    document.body.append(link);
    link.click();
    link.remove();
  } else {
    alert("Error download");
  }
}

export function deleteFile(file) {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/files/delete?id=${file._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(deleteFileAction(file._id));
      alert(response.data.message);
    } catch (e) {
      alert("Error delete");
    }
  };
}

export function searchFile(search) {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/files/search?search=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setFiles(response.data));
    } catch (e) {
      alert("Error search");
    }
  };
}
