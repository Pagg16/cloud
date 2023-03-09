const SHOWUPLOADER = "SHOWUPLOADER";
const HIDEUPLOADER = "HIDEUPLOADER";
const ADDUPLOADERFILE = "ADDUPLOADERFILE";
const REMOVEUPLOADER = "REMOVEUPLOADER";
const CHANGEUPLOADFILE = "CHANGEUPLOADFILE";

const defaultState = {
  isVisible: false,
  files: [],
};

export default function uploadReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOWUPLOADER:
      return { ...state, isVisible: true };
    case HIDEUPLOADER:
      return { ...state, isVisible: false };
    case ADDUPLOADERFILE:
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case REMOVEUPLOADER:
      return {
        ...state,
        files: [...state.files.filter((file) => file.id !== action.payload)],
      };
    case CHANGEUPLOADFILE:
      return {
        ...state,
        files: [
          ...state.files.map((file) =>
            file.id === action.payload.id
              ? { ...file, progress: action.payload.progress }
              : { ...file }
          ),
        ],
      };
    default:
      return state;
  }
}

export const showUploader = () => ({ type: SHOWUPLOADER });
export const hideUploader = () => ({ type: HIDEUPLOADER });
export const addUploadFile = (file) => ({
  type: ADDUPLOADERFILE,
  payload: file,
});
export const removeUploadFile = (fileId) => ({
  type: REMOVEUPLOADER,
  payload: fileId,
});
export const changeUploadFile = (payload) => ({
  type: CHANGEUPLOADFILE,
  payload: payload,
});
