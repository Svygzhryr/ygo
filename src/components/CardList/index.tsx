import { FC, useContext, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useAppSelector } from '../../hooks/redux';
import { cardsAPI } from '../../services/RequestService';
import { ICardMeta } from '../../types/types';
import { CardItem } from '../CardItem';
import { Pagination } from '../Pagination';
import styles from './CardList.module.scss';

interface ICardListProps {
  isLoading: boolean;
  meta: ICardMeta | null;
  setMeta: React.Dispatch<React.SetStateAction<ICardMeta | null>>;
}

export const CardList: FC<ICardListProps> = () => {
  const [offset, setOffset] = useState(1);
  const { newSearchValue } = useAppSelector((state) => state.searchReducer);
  console.log(newSearchValue);
  const { data, error, isLoading, isFetching } = cardsAPI.useFetchAllCardsQuery({
    num: 12,
    offset,
    search: newSearchValue,
  });
  const cardList = data?.data;
  const meta = data?.meta;

  return (
    <div className={styles.wrapper}>
      {error && <h5 className={styles.errorMessage}>No cards matching your query.</h5>}
      {cardList && (
        <Pagination isFetching={isFetching} meta={meta} offset={offset} setOffset={setOffset} />
      )}
      <div className={styles.cardListWrapper}>
        {isLoading && (
          <SkeletonTheme baseColor="#1b1b1b" highlightColor="#303030">
            {Array(12)
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
    </div>
  );
};
