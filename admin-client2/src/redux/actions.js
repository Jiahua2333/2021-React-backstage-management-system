import {
  RESET_USER,
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
} from "./action-types";
import { reqLogin } from "../api";
import storageUtils from "../utils/storageUtils";

export const setHeadTitle = (title) => ({ type: SET_HEAD_TITLE, data: title });

export const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });

export const showErrorMsg = (errorMsg) => ({
  type: SHOW_ERROR_MSG,
  data: errorMsg,
});

export const logout = () => {
  storageUtils.removeUser();
  return { type: RESET_USER };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const result = await reqLogin(username, password);

    if (result.status === 0) {
      const user = result.data;
      storageUtils.saveUser(user);
      dispatch(receiveUser(user));
    } else {
      const msg = result.msg;
      dispatch(showErrorMsg(msg));
    }
  };
};
