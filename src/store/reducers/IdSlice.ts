import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
};

export const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export default idSlice.reducer;
