import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.push(action.payload)
    },
    deleteImage: (state, action) => {
      state.pop(action.payload)
    }
  },
});

export const {addImage, deleteImage} = imagesSlice.actions;
export default imagesSlice.reducer;
