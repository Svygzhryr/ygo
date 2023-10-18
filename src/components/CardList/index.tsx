import React, { Component } from 'react';
import RequestService from '../../services/RequestService';
import styles from './CardList.module.scss';

export default class CardList extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <button>Card</button>
        <button>Card</button>
        <button>Card</button>
        <button>Card</button>
      </div>
    );
  }
}
