import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import fileReduser from "./fileReduser";
import userReduser from "./userReduser";

const rootReduser = combineReducers({
  user: userReduser,
  files: fileReduser,
});

export const store = createStore(rootReduser, compose(applyMiddleware(thunk)));
