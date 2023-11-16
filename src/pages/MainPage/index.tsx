import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { CardList } from '../../components/CardList';
import { Search } from '../../components/Search';
import { useAppSelector } from '../../hooks/redux';
import { ICardMeta } from '../../types/types';
import styles from './MainPage.module.scss';

export type MainSearch = {
  page?: string;
  search?: string;
  id?: string;
};

export const MainPage: FC = () => {
  const { newSearchValue } = useAppSelector((state) => state.searchReducer);
  const [meta, setMeta] = useState<ICardMeta | null>(null);
  const [throwErrorMessage, setThrowErrorMessage] = useState('');

  const handleThrowError = () => {
    setThrowErrorMessage('Whoops! An error has occured.');
  };

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
        <CardList meta={meta} setMeta={setMeta} />
      </section>
      <Outlet />
    </div>
  );
};
