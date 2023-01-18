import { http } from "@helper/config";
import { IUserDataType } from "@interfaces/DataType";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getListUsers = createAsyncThunk(
  "user/getListUsers",
  async (query: string, { rejectWithValue }) => {
    return http
      .get(`api/users?${query}`)
      .then((data: any) => {
        return { data };
      })
      .catch((err) => rejectWithValue(err.response));
  }
);

const getUser = () => {
  return http.get(`api/user`);
};

const updateUser = (body: IUserDataType) => {
  return http.put(`api/user`, body);
};


const removeUser = (email: string) => {
  return http.delete(`api/users/${email}`);
};

export const userService = {
  getListUsers,
  removeUser,
  getUser,
  updateUser
};
