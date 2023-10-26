import React, { Component } from 'react';
import MainPage from '../pages/MainPage';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorFallback from '../components/ErrorFallback';

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
