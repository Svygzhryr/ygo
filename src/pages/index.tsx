import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setupStore } from '../store/store';
import { MainPage } from './MainPage';

const Home = () => {
  const store = setupStore();

  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default Home;
