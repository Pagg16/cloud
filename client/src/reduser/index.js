import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import fileReduser from "./fileReduser";
import uploadReducer from "./uploadReduser";
import userReduser from "./userReduser";
import appReduser from "./appReduser";

const rootReduser = combineReducers({
  user: userReduser,
  files: fileReduser,
  upload: uploadReducer,
  app: appReduser,
});

export const store = createStore(rootReduser, compose(applyMiddleware(thunk)));
