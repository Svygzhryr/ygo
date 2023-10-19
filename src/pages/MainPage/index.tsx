import React, { ChangeEvent, Component } from 'react';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import RequestService from '../../services/RequestService';
import { ICard } from '../../types/types';
import styles from './MainPage.module.scss';

interface ICardState {
  cards: ICard[];
  searchValue: string;
}

export default class MainPage extends Component<object, ICardState> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      searchValue: '',
    };
  }

  componentDidMount = async () => {
    const response = await RequestService.getCards();
    if (response?.data) {
      this.setState({ cards: response.data.data });
    }
  };

  async handleOnClick() {
    if (!this.state.searchValue) return;

    const response = await RequestService.getCards(...[, ,], this.state.searchValue);
    if (response?.data) {
      this.setState({ cards: response.data.data });
    }
  }

  handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    return (
      <section className={styles.wrapper}>
        <Search
          value={this.state.searchValue}
          onClick={this.handleOnClick.bind(this)}
          onChange={this.handleOnChange.bind(this)}
        />
        <CardList cards={this.state.cards} />
      </section>
    );
  }
}
