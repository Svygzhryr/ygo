import { FC, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import next from '../../assets/next.svg';
import prev from '../../assets/prev.svg';
import { CardContext } from '../../contexts/cardContext';
import { MainSearch } from '../../pages/MainPage';
import { cardsAPI, getCards } from '../../services/RequestService';
import { ICardMeta } from '../../types/types';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  meta: ICardMeta | null | undefined;
  isFetching: boolean;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: FC<IPaginationProps> = ({ meta, isFetching, offset, setOffset }) => {
  const currentPage = Math.floor(offset / 12) + 1;

  const { searchValue } = useContext(CardContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePrevPage = () => {
    setOffset(offset - 12);
  };

  const handleNextPage = () => {
    setOffset(offset + 12);
  };

  useEffect(() => {
    const params: MainSearch = Object.fromEntries(searchParams.entries());
    params.page = String(currentPage);
    if (searchValue) {
      params.search = searchValue;
    }

    setSearchParams(params);
  }, [offset]);

  if (!meta) {
    return <h1>Can't get card data...</h1>;
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevPage} disabled={currentPage <= 1 || isFetching}>
        {isFetching ? <div className={styles.loader}></div> : <img src={prev} />}
      </button>
      <button disabled={true}>{currentPage}</button>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= meta?.total_pages + 1 || isFetching}
      >
        {isFetching ? <div className={styles.loader}></div> : <img src={next} />}
      </button>
    </div>
  );
};
