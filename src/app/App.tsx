import React, { Component } from 'react';
import MainPage from '../pages/MainPage';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorFallback from '../components/ErrorFallback';

type MyState = { count: number };

export default class App extends Component<object, MyState> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <>
        {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
        <MainPage />
        {/* </ErrorBoundary> */}
      </>
    );
  }
}
