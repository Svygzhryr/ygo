import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { ICard } from '../../types/types';
import { CardItem } from '../CardItem';
import styles from './CardList.module.scss';

interface ICardListProps {
  cards: ICard[];
  isLoading: boolean;
}

export const CardList: FC<ICardListProps> = ({ cards, isLoading }) => {
  return (
    <div className={styles.wrapper}>
      {!cards.length && !isLoading && (
        <h5 className={styles.errorMessage}>No cards matching your query.</h5>
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
