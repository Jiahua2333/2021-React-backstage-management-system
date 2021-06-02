// save data to local
import store from "store";

const USER_KEY = "user_key";

const storageUtils = {
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY, user);
  },

  getUser(user) {
    // return JSON.parse(localStorage.getItem(USER_KEY) || {});
    return store.get(USER_KEY) || {};
  },

  removeUser(user) {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  },
};

export default storageUtils;
