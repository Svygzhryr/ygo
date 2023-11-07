import { FC, useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { CardContext } from '../../contexts/cardContext';
import { ICardMeta } from '../../types/types';
import { CardItem } from '../CardItem';
import { Pagination } from '../Pagination';
import styles from './CardList.module.scss';

interface ICardListProps {
  searchValue: string;
  isLoading: boolean;
  meta: ICardMeta | null;
  setMeta: React.Dispatch<React.SetStateAction<ICardMeta | null>>;
}

export const CardList: FC<ICardListProps> = ({ isLoading, meta, setMeta, searchValue }) => {
  const cards = useContext(CardContext).cardList;
  return (
    <div className={styles.wrapper}>
      {!cards.length && !isLoading && (
        <h5 className={styles.errorMessage}>No cards matching your query.</h5>
      )}
      {!isLoading && !!cards.length && (
        <Pagination searchValue={searchValue} meta={meta} setMeta={setMeta} />
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
        {!isLoading &&
          cards.map((card) => {
            return <CardItem key={card.id} card={card} />;
          })}
      </div>
    </div>
  );
};
