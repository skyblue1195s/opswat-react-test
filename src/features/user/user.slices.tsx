import { createSlice } from "@reduxjs/toolkit";
import { userService } from "@services/Users";
import { IUserReducer } from "@interfaces/DataType";
const initialState = {
  loading: false,
  users: [],
  params: "",
  userDetails: {},
  pagination: {},
};

const userSlice = createSlice({
  name: "userReducers",
  initialState: initialState as IUserReducer,
  extraReducers(builder) {
    builder
      .addCase(userService.getListUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(userService.getListUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data ? action.payload.data : [];
      })
      .addCase(userService.getListUsers.rejected, (state) => {
        state.loading = false;
      })
  },
  reducers: {
    clearUserDetail: (state) => {
      state.userDetails = {};
    },
  },
});
export const { clearUserDetail } = userSlice.actions;
export default userSlice.reducer;
