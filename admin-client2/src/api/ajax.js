import axios from "axios";
import { message } from "antd";

const ajax = (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    let promise;
    if (method === "GET") {
      promise = axios.get(url, {
        params: data,
      });
    } else {
      // console.log(data);
      promise = axios.post(url, data);
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        message.error("Fail request" + error.message);
      });
  });

  //   if (method === "GET") {
  //     return axios.get(url, {
  //       params: data,
  //     });
  //   } else {
  //     return axios.post(url, data);
  //   }
};

export default ajax;
