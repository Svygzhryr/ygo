import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemsPerPage: 12,
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setThreeItems(state) {
      state.itemsPerPage = 3;
    },
    setSixItems(state) {
      state.itemsPerPage = 6;
    },
    setTwelveItems(state) {
      state.itemsPerPage = 12;
    },
  },
});

export default itemsPerPageSlice.reducer;
