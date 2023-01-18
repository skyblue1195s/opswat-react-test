import { createSlice } from "@reduxjs/toolkit";

interface ISubmitForm {
  isSubmit: boolean;
  randomNumber: number;
  action: string; //action when submit form
}

const initialState = {
  isSubmit: false,
  randomNumber: 0,
  action: "",
} as ISubmitForm;

const submitFormSlice = createSlice({
  name: "submitForm",
  initialState,
  reducers: {
    setSubmitForm(state, action) {
      state.isSubmit = action.payload.isSubmit;
      state.randomNumber = Math.round(Math.random() * 1000);
      state.action = action.payload.action;
    },
  },
});

export const { setSubmitForm } = submitFormSlice.actions;
export default submitFormSlice.reducer;
