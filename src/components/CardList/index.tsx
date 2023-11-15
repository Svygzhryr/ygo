import { FC, useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { CardContext } from '../../contexts/cardContext';
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

export const CardList: FC<ICardListProps> = ({ meta, setMeta }) => {
  // const { cardList } = useContext(CardContext);
  const { data, error, isLoading } = cardsAPI.useFetchAllCardsQuery();
  const cardList = data?.data;

  console.log(data);
  return (
    <div className={styles.wrapper}>
      {error && <h5 className={styles.errorMessage}>No cards matching your query.</h5>}
      {cardList && <Pagination meta={meta} setMeta={setMeta} />}
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
