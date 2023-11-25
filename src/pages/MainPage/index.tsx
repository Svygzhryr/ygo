import { FC, useEffect, useState } from 'react';
import CardDetails from 'src/components/CardDetails/CardDetails';
import { CardList } from 'src/components/CardList';
import { Search } from 'src/components/Search';
import { IServerSideProps } from 'src/types/types';

import styles from './MainPage.module.scss';

export type MainSearch = {
  page?: string;
  search?: string;
  id?: string;
};

interface IMainPageProps {
  newData: IServerSideProps;
}

export const MainPage: FC<IMainPageProps> = ({ newData }) => {
  const { cardsData, singleCardData } = newData;
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
        <CardList newData={cardsData} />
      </section>
      <CardDetails data={singleCardData} />
    </div>
  );
};
