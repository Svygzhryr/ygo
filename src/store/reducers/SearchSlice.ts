import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newSearchValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    newSetSearchValue(state, action) {
      state.newSearchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
