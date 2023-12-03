import { RootState } from './store';

export const controlledData = (state: RootState) => state.controlledReducer.data;
export const controlledCountrySearch = (state: RootState) => state.controlledReducer.search;
export const controlledFilteredCountries = (state: RootState) =>
  state.controlledReducer.filteredCountries;
export const controlledIsSuggestions = (state: RootState) =>
  state.controlledReducer.isSuggestionsVisible;
export const controlledBase64 = (state: RootState) => state.controlledReducer.base64;

export const uncontrolledData = (state: RootState) => state.uncontrolledReducer.data;
export const uncontrolledCountrySearch = (state: RootState) => state.uncontrolledReducer.search;
export const uncontrolledFilteredCountries = (state: RootState) =>
  state.uncontrolledReducer.filteredCountries;
export const uncontrolledIsSuggestions = (state: RootState) =>
  state.uncontrolledReducer.isSuggestionsVisible;
export const uncontrolledBase64 = (state: RootState) => state.uncontrolledReducer.base64;
export const uncontrolledErrors = (state: RootState) => state.uncontrolledReducer.errors;

export const isNotificationActive = (state: RootState) => state.notificationReducer.isActive;
