import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setIsActive(state, action) {
      state.isActive = action.payload;
    },
  },
});

export default notificationSlice.reducer;
