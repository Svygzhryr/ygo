import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from '../app/App';
import { setupStore } from '../store/store';
import '../styles/_normalize.scss';
import '../styles/globals.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const store = setupStore();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
