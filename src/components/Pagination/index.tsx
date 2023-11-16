import { FC, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import next from '../../assets/next.svg';
import prev from '../../assets/prev.svg';
import { CardContext } from '../../contexts/cardContext';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { MainSearch } from '../../pages/MainPage';
import { currentPageSlice } from '../../store/reducers/PaginationSlice';
import { ICardMeta } from '../../types/types';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  meta: ICardMeta | null | undefined;
  isFetching: boolean;
}

export const Pagination: FC<IPaginationProps> = ({ meta, isFetching }) => {
  const { newSearchValue } = useAppSelector((state) => state.searchReducer);
  const { currentPage } = useAppSelector((state) => state.pageReducer);
  const { nextPage, prevPage } = currentPageSlice.actions;
  const { searchValue } = useContext(CardContext);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePrevPage = () => {
    dispatch(prevPage());
  };

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  useEffect(() => {
    const params: MainSearch = Object.fromEntries(searchParams.entries());
    params.page = String(currentPage + 1);
    if (searchValue) {
      params.search = searchValue;
    }

    setSearchParams(params);
  }, []);

  if (!meta) {
    return <h1>Can't get card data...</h1>;
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevPage} disabled={currentPage <= 0 || isFetching}>
        {isFetching ? <div className={styles.loader}></div> : <img src={prev} />}
      </button>
      <button disabled={true}>{currentPage + 1}</button>
      <button onClick={handleNextPage} disabled={meta?.pages_remaining === 0 || isFetching}>
        {isFetching ? <div className={styles.loader}></div> : <img src={next} />}
      </button>
    </div>
  );
};
