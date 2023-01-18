import axios from "axios";
import { isEmpty } from "lodash";
import { MESSAGE_TYPE, TOKEN } from "./constants";
import { handleErrors } from "./handleErrors";
import { NotificationConfig } from "./utils";

const token = localStorage.getItem(TOKEN); // need implement redux
export const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

if (token) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

http.interceptors.response.use(
  (rs) => {
    return rs.data;
  },
  (err) => {
    const { statusText, status, data } = err.response;
    const errorMessage = isEmpty(data.errors) ? data.message : handleErrors(data.errors)
    NotificationConfig(MESSAGE_TYPE.ERROR, statusText, errorMessage, status);
    return Promise.reject({response: {status, data}})
  }
);

// call api with none token
export const noAuth = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

noAuth.interceptors.response.use(
  (rs) => {
    return rs.data;
  },
  (err) => {
    const { statusText, status, data } = err.response;
    NotificationConfig(MESSAGE_TYPE.ERROR, statusText, data.message, status);
  }
);
