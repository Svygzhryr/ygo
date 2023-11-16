import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 0,
};

export const currentPageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    nextPage(state) {
      state.currentPage++;
    },
    prevPage(state) {
      state.currentPage--;
    },
  },
});

export default currentPageSlice.reducer;
