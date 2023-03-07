const SETFILES = "SETFILES";
const SETCURRENTDIR = "SETCURRENTDIR";
const ADDFILE = "ADDFILE";
const SETPOPUP = "SETPOPUP";
const PUSHDIRSTACK = "PUSHDIRSTACK";
const DELETEFILE = "DELETEFILE";

const defaultState = {
  files: [],
  currentDir: null,
  popupVisible: false,
  dirStack: [],
};

export default function fileReduser(state = defaultState, action) {
  switch (action.type) {
    case SETFILES:
      return { ...state, files: action.payload };
    case SETCURRENTDIR:
      return { ...state, currentDir: action.payload };
    case ADDFILE:
      return { ...state, files: [...state.files, action.payload] };
    case SETPOPUP:
      return { ...state, popupVisible: action.payload };
    case PUSHDIRSTACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    case DELETEFILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    default:
      return state;
  }
}

export const setFiles = (files) => ({ type: SETFILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SETCURRENTDIR, payload: dir });
export const addFile = (file) => ({ type: ADDFILE, payload: file });
export const setPopupFile = (visible) => ({ type: SETPOPUP, payload: visible });
export const pushDirStack = (dir) => ({ type: PUSHDIRSTACK, payload: dir });
export const deleteFileAction = (fileId) => ({
  type: DELETEFILE,
  payload: fileId,
});
