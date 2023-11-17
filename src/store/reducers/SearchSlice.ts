import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
