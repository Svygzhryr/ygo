import { RootState } from './store';

export const controlledData = (state: RootState) => state.controlledReducer.data;
export const controlledCountrySearch = (state: RootState) => state.controlledReducer.search;
export const controlledFilteredCountries = (state: RootState) =>
  state.controlledReducer.filteredCountries;
export const controlledIsSuggestions = (state: RootState) =>
  state.controlledReducer.isSuggestionsVisible;
export const controlledBase64 = (state: RootState) => state.controlledReducer.base64;
