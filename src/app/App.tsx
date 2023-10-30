import { FC } from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import { MainPage } from '../pages/MainPage';

export const App: FC = () => {
  return (
    <>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </>
  );
};
