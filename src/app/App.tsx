import React, { Component, FC } from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import ErrorFallback from '../components/ErrorFallback';
import { MainPage } from '../pages/MainPage';

export const App: FC = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MainPage />
      </ErrorBoundary>
    </>
  );
};
