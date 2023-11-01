import { FC, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, useNavigate } from 'react-router-dom';

import fallback from '../../assets/fallback.jpg';
import { getCard } from '../../services/RequestService';
import { ICard } from '../../types/types';
import styles from './Details.module.scss';

export const Details: FC = () => {
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
    const id = window.location.href.match(/(\d{1,}$)/)?.[0];
    if (id) {
      getCard(id).then((response) => {
        setCard(response.data.data[0]);
        setIsLoading(false);
      });
    } else {
      console.error('Error getting card..');
    }
  }, []);

  console.log(card);
  return (
    <>
      <Link to="/" className={styles.overlay}></Link>
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
              className={styles.image}
              src={card.card_images[0].image_url || fallback}
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
