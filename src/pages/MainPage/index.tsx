import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { CardList } from '../../components/CardList';
import { Search } from '../../components/Search';
import RequestService from '../../services/RequestService';
import { ICard, ICardMeta } from '../../types/types';
import styles from './MainPage.module.scss';

export const MainPage: FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [meta, setMeta] = useState<ICardMeta | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [throwErrorMessage, setThrowErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCardSearch = async () => {
    setIsLoading(true);

    const { data } = await RequestService.getCards(...[, ,], searchValue);
    if (data?.data) {
      setCards(data?.data);
      setMeta(data.meta);
      setIsLoading(false);
      localStorage.setItem('prevSearch', searchValue);
    }
  };

  const handleOnClick = async () => {
    getCardSearch();
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') getCardSearch();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleThrowError = () => {
    setThrowErrorMessage('Whoops! An error has occured.');
  };

  useEffect(() => {
    const storageSearchValue = localStorage.getItem('prevSearch');
    if (storageSearchValue) {
      setSearchValue(storageSearchValue);
      getCardSearch();
    } else {
      RequestService.getCards().then((response) => {
        if (response) {
          setCards(response.data.data);
          setMeta(response.data.meta);
          setIsLoading(false);
        }
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (throwErrorMessage) {
      throw new Error(throwErrorMessage);
    }
  }, [throwErrorMessage]);

  return (
    <div className={styles.details}>
      <section className={styles.wrapper}>
        <button className={styles.error} onClick={handleThrowError}>
          Throw an error!
        </button>
        <Search
          value={searchValue}
          onClick={handleOnClick}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <CardList
          cards={cards}
          setCards={setCards}
          isLoading={isLoading}
          meta={meta}
          setMeta={setMeta}
          searchValue={searchValue}
        />
      </section>
      <Outlet />
    </div>
  );
};
