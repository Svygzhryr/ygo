import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setId(state, action) {
      state.data = action.payload;
    },
  },
});

export default dataSlice.reducer;
