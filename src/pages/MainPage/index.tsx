import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { CardList } from '../../components/CardList';
import { Search } from '../../components/Search';
import { CardContext } from '../../contexts/cardContext';
import { getCards } from '../../services/RequestService';
import { ICardMeta } from '../../types/types';
import styles from './MainPage.module.scss';

export type MainSearch = {
  page?: string;
  search?: string;
  id?: string;
};

export const MainPage: FC = () => {
  const { setCardList, searchValue, setSearchValue } = useContext(CardContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [meta, setMeta] = useState<ICardMeta | null>(null);
  const [searchTemp, setSearchTemp] = useState('');
  const [throwErrorMessage, setThrowErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    const params: MainSearch = {
      page: String(1),
    };

    if (searchTemp) {
      params.search = searchTemp;
    }

    setSearchParams(params);

    setSearchValue(searchTemp);
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

    const { data } = await getCards(...[, ,], searchValue || '');
    if (data?.data) {
      setCardList(data.data);
      setMeta(data.meta);
      console.log(data.meta);
      setIsLoading(false);
      localStorage.setItem('prevSearch', searchValue || '');
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
        <CardList isLoading={isLoading} meta={meta} setMeta={setMeta} />
      </section>
      <Outlet />
    </div>
  );
};
