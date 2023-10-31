import { ChangeEvent, Component, KeyboardEvent } from 'react';

import CardList from '../../components/CardList';
import Search from '../../components/Search';
import RequestService from '../../services/RequestService';
import { ICard } from '../../types/types';
import styles from './MainPage.module.scss';

interface ICardState {
  cards: ICard[];
  searchValue: string;
  throwErrorMessage: string | null;
  isLoading: boolean;
}

export default class MainPage extends Component<object, ICardState> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      searchValue: '',
      throwErrorMessage: null,
      isLoading: false,
    };

    this.handleThrowError = this.handleThrowError.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async getCardSearch() {
    this.setState({ isLoading: true });

    const { data } = await RequestService.getCards(...[, ,], this.state.searchValue);
    if (data?.data) {
      this.setState({ cards: data.data, isLoading: false });
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

  componentDidMount = () => {
    const storageSearchValue = localStorage.getItem('prevSearch');
    if (storageSearchValue) {
      this.setState({ searchValue: storageSearchValue }, this.getCardSearch);
    } else {
      RequestService.getCards().then((response) => {
        if (response) {
          this.setState({ cards: response.data.data, isLoading: false });
        }
      });
    }
    this.setState({ isLoading: false });
  };

  componentDidUpdate = () => {
    if (this.state.throwErrorMessage) {
      throw new Error(this.state.throwErrorMessage);
    }
  };

  render() {
    return (
      <section className={styles.wrapper}>
        <button className={styles.error} onClick={this.handleThrowError}>
          Throw an error!
        </button>
        <Search
          value={this.state.searchValue}
          onClick={this.handleOnClick}
          onChange={this.handleOnChange}
          onKeyDown={this.handleKeyDown}
        />
        <CardList cards={this.state.cards} isLoading={this.state.isLoading} />
      </section>
    );
  }
}
