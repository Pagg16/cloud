import axios from "axios";
import { addFile, deleteFileAction, setFiles } from "../reduser/fileReduser";

export function getFiles(dirId) {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/files${dirId ? "?parent=" + dirId : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
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
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
            }
          },
        }
      );
      dispatch(addFile(response.data));
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };
}

export async function downloadfile(file) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://localhost:4000/api/files/download?=id${file._id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.herf = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export async function deleteFile(file) {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/files/delete?id=${file._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(deleteFileAction(file._id));
      alert(response.data.message);
    } catch (e) {}
  };
}
