import React, { Component } from 'react';
import styles from './App.module.scss';
import MainPage from '../pages/MainPage';

type MyState = { count: number };

export default class App extends Component<object, MyState> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <>
        <MainPage />
      </>
    );
  }
}
