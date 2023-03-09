const SHOWLOADER = "SHOWLOADER";
const HIDELOADER = "HIDELOADER";

const defaultState = {
  loader: false,
};

export default function loaderReduser(state = defaultState, action) {
  switch (action.type) {
    case SHOWLOADER:
      return { ...state, loader: true };

    case HIDELOADER:
      return { ...state, loader: false };

    default:
      return state;
  }
}

export const showLoader = () => ({ type: SHOWLOADER });
export const hideLoader = () => ({ type: HIDELOADER });
