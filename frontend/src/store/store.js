import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import selectedCardSlice from './slices/selectedCardSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    selectedCard: selectedCardSlice
  },
});

export default store;