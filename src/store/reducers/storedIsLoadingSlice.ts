import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storedIsLoading: false,
};

export const storedIsLoadingSlice = createSlice({
  name: 'storedIsLoading',
  initialState,
  reducers: {
    startLoading(state) {
      state.storedIsLoading = true;
    },
    stopLoading(state) {
      state.storedIsLoading = false;
    },
  },
});

export default storedIsLoadingSlice.reducer;
