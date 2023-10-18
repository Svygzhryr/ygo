import React, { Component } from 'react';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import styles from './MainPage.module.scss';

export default class MainPage extends Component {
  render() {
    return (
      <section className={styles.wrapper}>
        <Search />
        <CardList />
      </section>
    );
  }
}
