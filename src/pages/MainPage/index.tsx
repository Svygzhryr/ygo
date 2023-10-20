import React, { ChangeEvent, Component, KeyboardEvent } from 'react';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import RequestService from '../../services/RequestService';
import { ICard } from '../../types/types';
import styles from './MainPage.module.scss';

interface ICardState {
  cards: ICard[];
  searchValue: string;
  throwErrorMessage: string | null;
}

export default class MainPage extends Component<object, ICardState> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      searchValue: '',
      throwErrorMessage: null,
    };
  }

  async getCardSearch() {
    if (!this.state.searchValue) return;

    const response = await RequestService.getCards(...[, ,], this.state.searchValue);
    if (response?.data) {
      this.setState({ cards: response.data.data });
      localStorage.setItem('prevSearch', this.state.searchValue);
    }
  }

  async handleOnClick() {
    this.getCardSearch();
  }

  async handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') this.getCardSearch();
  }

  handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: e.target.value });
  }

  handleThrowError() {
    this.setState({ throwErrorMessage: 'Whoops! An error has occured.' });
  }

  componentDidMount = async () => {
    const storageSearchValue = localStorage.getItem('prevSearch');
    if (storageSearchValue) {
      this.setState({ searchValue: storageSearchValue }, this.getCardSearch);
    } else {
      const response = await RequestService.getCards();
      if (response?.data) {
        this.setState({ cards: response.data.data });
      }
    }
  };

  componentDidUpdate = () => {
    if (this.state.throwErrorMessage) {
      throw new Error(this.state.throwErrorMessage);
    }
  };

  render() {
    return (
      <section className={styles.wrapper}>
        <button className={styles.error} onClick={this.handleThrowError.bind(this)}>
          Throw an error!
        </button>
        <Search
          value={this.state.searchValue}
          onClick={this.handleOnClick.bind(this)}
          onChange={this.handleOnChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
        <CardList cards={this.state.cards} />
      </section>
    );
  }
}
