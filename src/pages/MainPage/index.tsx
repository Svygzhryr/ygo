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
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCards } from '../../services/RequestService';
import { searchSlice } from '../../store/reducers/SearchSlice';
import { ICardMeta } from '../../types/types';
import styles from './MainPage.module.scss';

export type MainSearch = {
  page?: string;
  search?: string;
  id?: string;
};

export const MainPage: FC = () => {
  const { setCardList, searchValue, setSearchValue } = useContext(CardContext);

  const [meta, setMeta] = useState<ICardMeta | null>(null);
  const [throwErrorMessage, setThrowErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleThrowError = () => {
    setThrowErrorMessage('Whoops! An error has occured.');
  };

  const getCardsHandler = useCallback(async () => {
    setIsLoading(true);

    const { data } = await getCards(...[, ,], searchValue || '');
    if (data?.data) {
      setCardList(data.data);
      setMeta(data.meta);
      setIsLoading(false);
      localStorage.setItem('prevSearch', searchValue || '');
    }
  }, [searchValue]);

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
        <Search />
        <CardList isLoading={isLoading} meta={meta} setMeta={setMeta} />
      </section>
      <Outlet />
    </div>
  );
};
