import { FC, ReactEventHandler, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import fallback from '../../assets/fallback.jpg';
import { getCard } from '../../services/RequestService';
import { ICard } from '../../types/types';
import styles from './Details.module.scss';

export const Details: FC = () => {
  const location = useLocation();

  const [card, setCard] = useState<ICard>({
    attribute: '',
    id: 0,
    name: '',
    type: '',
    frameType: '',
    desc: '',
    atk: 0,
    def: 0,
    level: 0,
    race: '',
    archetype: '',
    card_sets: [
      {
        set_name: '',
        set_code: '',
        set_rarity: '',
        set_rarity_code: '',
        set_price: '',
      },
    ],
    card_images: [
      {
        id: 0,
        image_url: '',
        image_url_small: '',
        image_url_cropped: '',
      },
    ],
    card_prices: [
      {
        cardmarket_price: '',
        tcgplayer_price: '',
        ebay_price: '',
        amazon_price: '',
        coolstuffinc_price: '',
      },
    ],
  });
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
      console.error('Error getting card..');
    }
  }, [location.search]);

  const addDefaultSrc: ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.src = fallback;
    }
  };

  console.log(card);
  return (
    <>
      <Link to="/?page=1" className={styles.overlay} />
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

        <div className={styles.closeWrapper}>
          <Link className={styles.close} to="/">
            Close
          </Link>
        </div>
      </div>
    </>
  );
};
