import { ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { CardList } from '../../components/CardList';
import { Search } from '../../components/Search';
import { getCards } from '../../services/RequestService';
import { ICard, ICardMeta } from '../../types/types';
import styles from './MainPage.module.scss';

export const MainPage: FC = () => {
  // const navigate = useNavigate();
  // const location = useLocation();

  const [cards, setCards] = useState<ICard[]>([]);
  const [meta, setMeta] = useState<ICardMeta | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchTemp, setSearchTemp] = useState('');
  const [throwErrorMessage, setThrowErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setSearchValue(searchTemp);
    // navigate(`${location.search}&search=${searchTemp}`);
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleOnClick();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTemp(e.target.value);
  };

  const handleThrowError = () => {
    setThrowErrorMessage('Whoops! An error has occured.');
  };

  useEffect(() => {
    const storageSearchValue = localStorage.getItem('prevSearch') || '';
    if (storageSearchValue) {
      setSearchValue(storageSearchValue);
      setSearchTemp(storageSearchValue);
    }
  }, []);

  const getCardsHandler = useCallback(async () => {
    setIsLoading(true);

    const { data } = await getCards(...[, ,], searchValue);
    if (data?.data) {
      setCards(data?.data);
      setMeta(data.meta);
      setIsLoading(false);
      localStorage.setItem('prevSearch', searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    getCardsHandler();
  }, [getCardsHandler]);

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
          value={searchTemp}
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
