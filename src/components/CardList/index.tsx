import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useAppSelector } from '../../hooks/redux';
import { cardsAPI } from '../../pages/api/api';
import { CardItem } from '../CardItem';
import { ItemsPerPage } from '../ItemsPerPage';
import { Pagination } from '../Pagination';
import styles from './CardList.module.scss';

export const CardList: FC = () => {
  const { currentPage } = useAppSelector((state) => state.pageReducer);
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const { itemsPerPage } = useAppSelector((state) => state.itemsPerPageReducer);

  const { data, error, isLoading, isFetching } = cardsAPI.useFetchAllCardsQuery({
    num: itemsPerPage,
    offset: Math.ceil(currentPage * itemsPerPage),
    fname: searchValue,
  });

  const cardList = data?.data;
  const meta = data?.meta;

  if (error) {
    return <h5 className={styles.errorMessage}>No cards matching your query.</h5>;
  }

  return (
    <div className={styles.wrapper}>
      {cardList && (
        <>
          <Pagination isFetching={isFetching} meta={meta} /> <ItemsPerPage />
        </>
      )}

      <div className={styles.cardListWrapper}>
        {isLoading && (
          <SkeletonTheme baseColor="#1b1b1b" highlightColor="#303030">
            {Array(itemsPerPage)
              .fill(true)
              .map((_, i) => (
                <Skeleton key={i} className={styles.skeleton} />
              ))}
          </SkeletonTheme>
        )}
        {cardList &&
          cardList?.map((card) => {
            return <CardItem key={card.id} card={card} />;
          })}
      </div>
      {cardList && itemsPerPage !== 3 && (
        <>
          <Pagination isFetching={isFetching} meta={meta} />
        </>
      )}
    </div>
  );
};
