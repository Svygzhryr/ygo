import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';
import Details from '../pages/details/[id]';
import { MainPage } from '../pages/mainpage';
import NotFound from '../pages/notfound';

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
