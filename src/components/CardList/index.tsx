import router from 'next/router';
import { FC, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppSelector } from 'src/hooks/redux';
import { ICard, IServerSideData } from 'src/types/types';

import { CardItem } from '../CardItem';
import { ItemsPerPage } from '../ItemsPerPage';
import { Pagination } from '../Pagination';
import styles from './CardList.module.scss';

interface ICardListProps {
  newData: IServerSideData;
}

export const CardList: FC<ICardListProps> = ({ newData }) => {
  const { data, isError } = newData;
  const { itemsPerPage } = useAppSelector((state) => state.itemsPerPageReducer);

  const cardList = data?.data;
  const meta = data?.meta;

  if (isError) {
    return <h5 className={styles.errorMessage}>No cards matching your query.</h5>;
  }

  return (
    <div className={styles.wrapper}>
      {cardList && (
        <>
          <Pagination meta={meta} /> <ItemsPerPage />
        </>
      )}

      <div className={styles.cardListWrapper}>
        {/* {isLoading && (
          <SkeletonTheme baseColor="#1b1b1b" highlightColor="#303030">
            {Array(itemsPerPage)
              .fill(true)
              .map((_, i) => (
                <Skeleton key={i} className={styles.skeleton} />
              ))}
          </SkeletonTheme>
        )} */}
        {cardList &&
          cardList?.map((card: ICard) => {
            return <CardItem key={card.id} card={card} />;
          })}
      </div>
      {cardList && itemsPerPage !== 3 && (
        <>
          <Pagination meta={meta} />
        </>
      )}
    </div>
  );
};
