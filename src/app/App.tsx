import React, { Component } from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import ErrorFallback from '../components/ErrorFallback';
import MainPage from '../pages/MainPage';

export default class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MainPage />
        </ErrorBoundary>
      </>
    );
  }
}
