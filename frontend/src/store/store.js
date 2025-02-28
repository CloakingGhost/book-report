import { configureStore } from "@reduxjs/toolkit";
import imageReducer from './slices/imagesSlice';
import selectedCardReducer from './slices/selectedCardSlice';

const store = configureStore({
  reducer: {
    images: imageReducer,
    selectedCard: selectedCardReducer,
  },
});

export default store;