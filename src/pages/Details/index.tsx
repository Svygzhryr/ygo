import { FC, ReactEventHandler } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import fallback from '../../assets/fallback.jpg';
import { useAppSelector } from '../../hooks/redux';
import { cardState } from '../../utils/cardState';
import { cardsAPI } from '../api/api';
import styles from './Details.module.scss';

export const Details: FC = () => {
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.idReducer);
  const { data, isLoading, error } = cardsAPI.useFetchCardByIdQuery(id);
  const card = data?.data[0] || cardState;

  const addDefaultSrc: ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.src = fallback;
    }
  };

  const defineType = (type: string) => {
    switch (true) {
      case type.includes('Monster'):
        return styles.typeMonster;
      case type === 'Spell Card':
        return styles.typeSpell;
      case type === 'Trap Card':
        return styles.typeTrap;
      default:
        return styles.typeOther;
    }
  };

  const handleHistoryBack = () => {
    navigate(-1);
  };

  if (error) {
    return <h5>Can't retrieve card data..</h5>;
  }

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#2b2b2b" highlightColor="#707070">
        <Skeleton className={styles.skeletonCard} />
        {Array(5)
          .fill(true)
          .map((_, i) => (
            <Skeleton key={i} className={styles.skeletonText} />
          ))}
      </SkeletonTheme>
    );
  }

  return (
    <>
      <div onClick={handleHistoryBack} className={styles.overlay} />
      <div className={`${styles.fixed} ${defineType(card.type)}`}>
        <div className={styles.info}>
          <img
            onError={addDefaultSrc}
            className={styles.image}
            src={card.card_images[0].image_url}
            alt="A card"
          />
          <p className={styles.description}>{card.desc}</p>
        </div>
      </div>
    </>
  );
};
