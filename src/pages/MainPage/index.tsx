import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { CardList } from '../../components/CardList';
import { Search } from '../../components/Search';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { storedIsLoadingSlice } from '../../store/reducers/storedIsLoadingSlice';
import { ICardMeta } from '../../types/types';
import styles from './MainPage.module.scss';

export type MainSearch = {
  page?: string;
  search?: string;
  id?: string;
};

export const MainPage: FC = () => {
  const [meta, setMeta] = useState<ICardMeta | null>(null);
  const [throwErrorMessage, setThrowErrorMessage] = useState('');
  const { startLoading, stopLoading } = storedIsLoadingSlice.actions;
  const { storedIsLoading } = useAppSelector((state) => state.storedIsLoadingReducer);
  const dispatch = useAppDispatch();

  const handleThrowError = () => {
    setThrowErrorMessage('Whoops! An error has occured.');
  };

  useEffect(() => {
    if (throwErrorMessage) {
      throw new Error(throwErrorMessage);
    }
  }, [throwErrorMessage]);

  useEffect(() => {
    dispatch(startLoading());
    setTimeout(async () => {
      dispatch(stopLoading());
    }, 300);
  }, []);

  return (
    <div className={styles.details}>
      <section className={styles.wrapper}>
        {/* Implement separate loading flags in the Redux store for the main page and details page. These flags should indicate whether data is being loaded. */}
        {storedIsLoading && <h6>*custom redux loader...*</h6>}

        <button className={styles.error} onClick={handleThrowError}>
          Throw an error!
        </button>
        <Search />
        <CardList />
      </section>
      <Outlet />
    </div>
  );
};
