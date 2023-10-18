import React, { Component } from 'react';
import styles from './Search.module.scss';

export default class Search extends Component {
  render() {
    return (
      <div>
        <input className={styles.input} type="text" />
        <button className={styles.button}>Search</button>
      </div>
    );
  }
}
