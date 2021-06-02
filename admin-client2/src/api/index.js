import ajax from "./ajax";
import axios from "axios";
import { message } from "antd";

export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

export const reqUsers = () => ajax("/manage/user/list");

// export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");
export const reqAddOrUpdateUser = (user) =>
  ajax("/manage/user/" + (user._id ? "update" : "add"), user, "POST");

export const reqDeleteUser = (userId) =>
  ajax("/manage/user/delete", { userId }, "POST");

export const reqCategory = (categoryId) =>
  ajax("/manage/category/info", { categoryId });

export const reqCategories = (parentId) =>
  ajax("/manage/category/list", { parentId });

export const reqAddCategory = ({ parentId, categoryName }) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");

export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");

export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

export const reqAddOrUpdateProduct = (product) =>
  ajax("/manage/product/" + (product._id ? "update" : "add"), product, "POST");

export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

export const reqUpdateStatus = ({ productId, status }) =>
  ajax("/manage/product/updateStatus", { productId, status }, "POST");

export const reqDeleteImg = (name) =>
  ajax("/manage/img/delete", { name }, "POST");

export const reqRoles = () => ajax("/manage/role/list");

export const reqAddRole = (roleName) =>
  ajax("/manage/role/add", { roleName }, "POST");

export const reqUpdateRole = (role) =>
  ajax("/manage/role/update", role, "POST");

export const reqWeather = (city) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&aqi=no`;

  return new Promise((resolve, reject) => {
    let promise = axios.get(url);
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        message.error("Fail request" + error.message);
      });
  });
};
