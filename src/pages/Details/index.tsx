import { FC, ReactEventHandler, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';

import fallback from '../../assets/fallback.jpg';
import { getCard } from '../../services/RequestService';
import { cardState } from '../../utils/cardState';
import styles from './Details.module.scss';

export const Details: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [card, setCard] = useState(cardState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const id = location.search.match(/(\d{1,}$)/)?.[0];
    if (id) {
      getCard(id).then((response) => {
        setCard(response.data.data[0]);
        setIsLoading(false);
      });
    } else {
      setCard(card);
      setIsLoading(false);
    }
  }, [location.search]);

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

  return (
    <>
      <div onClick={handleHistoryBack} className={styles.overlay} />
      <div className={`${styles.fixed} ${defineType(card.type)}`}>
        {isLoading ? (
          <SkeletonTheme baseColor="#2b2b2b" highlightColor="#707070">
            <Skeleton className={styles.skeletonCard} />
            {Array(5)
              .fill(true)
              .map((_, i) => (
                <Skeleton key={i} className={styles.skeletonText} />
              ))}
          </SkeletonTheme>
        ) : (
          <div className={styles.info}>
            <img
              onError={addDefaultSrc}
              className={styles.image}
              src={card.card_images[0].image_url}
              alt="A card"
            />
            <p className={styles.description}>{card.desc}</p>
          </div>
        )}
      </div>
    </>
  );
};
