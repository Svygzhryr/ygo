import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../../utils/validation';

const initialState = {
  data: {},
  search: '',
  filteredCountries: countryList,
  isSuggestionsVisible: false,
};

export const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    filterCountries(state, action) {
      state.filteredCountries = countryList.filter((item) => item.includes(action.payload));
    },
    setSuggestions(state, action) {
      state.isSuggestionsVisible = action.payload;
    },
  },
});

export default controlledFormSlice.reducer;
