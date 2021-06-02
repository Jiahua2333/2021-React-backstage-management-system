import { combineReducers } from "redux";

import storageUtils from "../utils/storageUtils";
import {
  RESET_USER,
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
} from "./action-types";

const initHeadTitle = "Home";
const headTitle = (state = initHeadTitle, action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data;
    default:
      return state;
  }
};

const initUser = storageUtils.getUser();
const user = (state = initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {};
    case SHOW_ERROR_MSG:
      const errorMsg = action.data;
      return { ...state, errorMsg };
    default:
      return state;
  }
};

export default combineReducers({
  headTitle,
  user,
});
