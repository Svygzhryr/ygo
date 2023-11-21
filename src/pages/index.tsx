import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setupStore } from '../store/store';
import { MainPage } from './MainPage';

const Home = () => {
  const store = setupStore();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </BrowserRouter>
  );
};

export default Home;
