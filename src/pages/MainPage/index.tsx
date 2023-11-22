import { FC, useEffect, useState } from 'react';
import { CardList } from 'src/components/CardList';
import { Search } from 'src/components/Search';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { ICardMeta } from 'src/types/types';

import styles from './MainPage.module.scss';

export type MainSearch = {
  page?: string;
  search?: string;
  id?: string;
};

export const MainPage: FC = () => {
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
        <CardList />
      </section>
    </div>
  );
};
