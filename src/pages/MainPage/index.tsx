import { GetServerSideProps } from 'next';
import { FC, useEffect, useState } from 'react';
import { CardList } from 'src/components/CardList';
import { Search } from 'src/components/Search';

import styles from './MainPage.module.scss';

export type MainSearch = {
  page?: string;
  search?: string;
  id?: string;
};

interface IMainPageProps {
  newData: object;
}

export const MainPage: FC<IMainPageProps> = ({ newData }) => {
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
        <CardList newData={newData} />
      </section>
    </div>
  );
};
