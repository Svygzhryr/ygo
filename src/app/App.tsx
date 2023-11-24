import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Details from '../components/CardDetails/CardDetails';
import ErrorBoundary from '../components/ErrorBoundary';
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
