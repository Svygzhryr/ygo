import { FC, ReactEventHandler, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, useLocation } from 'react-router-dom';

import fallback from '../../assets/fallback.jpg';
import { getCard } from '../../services/RequestService';
import { cardState } from '../../utils/cardState';
import styles from './Details.module.scss';

export const Details: FC = () => {
  const location = useLocation();

  const [card, setCard] = useState(cardState);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const id = location.search.match(/(\d{1,}$)/)?.[0];
    setPage(location.search.match(/(?<=[=])\d*(?=[&])/)?.[0] as string);
    if (id) {
      getCard(id).then((response) => {
        setCard(response.data.data[0]);
        setIsLoading(false);
      });
    } else {
      console.error('Error getting card..');
    }
  }, [location.search]);

  const addDefaultSrc: ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.src = fallback;
    }
  };

  return (
    <>
      <Link to={`/?page=${page}`} className={styles.overlay} />
      <div className={styles.fixed}>
        {isLoading ? (
          <SkeletonTheme baseColor="#1b1b1b" highlightColor="#303030">
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
