import Image from 'next/image';
import { FC, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
import next from 'src/assets/next.svg';
import prev from 'src/assets/prev.svg';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { currentPageSlice } from 'src/store/reducers/PaginationSlice';
import { ICardMeta } from 'src/types/types';
import { MainSearch } from 'srcpages/MainPage';

import styles from './Pagination.module.scss';

interface IPaginationProps {
  meta: ICardMeta | null | undefined;
  isFetching: boolean;
}

export const Pagination: FC<IPaginationProps> = ({ meta, isFetching }) => {
  const { currentPage } = useAppSelector((state) => state.pageReducer);
  const { nextPage, prevPage } = currentPageSlice.actions;
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();

  // const [searchParams, setSearchParams] = useSearchParams();

  const handlePrevPage = () => {
    dispatch(prevPage());
  };

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  useEffect(() => {
    // const params: MainSearch = Object.fromEntries(searchParams.entries());
    // params.page = String(currentPage + 1);
    // if (searchValue) {
    //   params.search = searchValue;
    // }
    // setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!meta) {
    return <h1>Can't get card data...</h1>;
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevPage} disabled={currentPage <= 0 || isFetching}>
        {isFetching ? <div className={styles.loader}></div> : <Image alt="<" src={prev} />}
      </button>
      <button disabled={true}>{currentPage + 1}</button>
      <button onClick={handleNextPage} disabled={meta?.pages_remaining === 0 || isFetching}>
        {isFetching ? <div className={styles.loader}></div> : <Image alt=">" src={next} />}
      </button>
    </div>
  );
};
