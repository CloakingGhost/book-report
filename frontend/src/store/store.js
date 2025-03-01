import { configureStore } from "@reduxjs/toolkit";
import selectedCardReducer from './slices/selectedCardSlice';

const store = configureStore({
  reducer: {
    selectedCard: selectedCardReducer,
  },
});

export default store;