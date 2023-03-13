const SHOWLOADER = "SHOWLOADER";
const HIDELOADER = "HIDELOADER";
const CHANGETHEME = "CHANGETHEME";
const SHOWPOPUPSET = "SHOWPOPUPSET";
const HIDEPOPUPSET = "HIDEPOPUPSET";
const SETEXITBUTTON = "SETEXITBUTTON";

const defaultState = {
  loader: false,
  theme: "dark",
  setPopup: false,
  exitButton: null,
};

export default function loaderReduser(state = defaultState, action) {
  switch (action.type) {
    case SHOWLOADER:
      return { ...state, loader: true };

    case HIDELOADER:
      return { ...state, loader: false };

    case CHANGETHEME:
      return { ...state, theme: action.payload };

    case SHOWPOPUPSET:
      return { ...state, setPopup: true };

    case HIDEPOPUPSET:
      return { ...state, setPopup: false };

    case SETEXITBUTTON:
      return { ...state, exitButton: action.payload };

    default:
      return state;
  }
}

export const showLoader = () => ({ type: SHOWLOADER });
export const hideLoader = () => ({ type: HIDELOADER });
export const changeTheme = (theme) => ({ type: CHANGETHEME, payload: theme });
export const showSetPopup = () => ({ type: SHOWPOPUPSET });
export const hideSetPopup = () => ({ type: HIDEPOPUPSET });
export const setExitButton = (bts) => ({ type: SETEXITBUTTON, payload: bts });
