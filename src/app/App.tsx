import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';
import { Details } from '../pages/Details';
import { MainPage } from '../pages/MainPage';
import { NotFound } from '../pages/NotFound';

export const App: FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/details" element={<Details />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};
