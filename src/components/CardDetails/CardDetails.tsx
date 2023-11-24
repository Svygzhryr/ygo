import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactEventHandler } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import fallback from 'src/assets/fallback.jpg';
import { cardState } from 'src/utils/cardState';

import { cardsAPI } from '../../pages/api/api';
import styles from './Details.module.scss';

const Details: FC = () => {
  // const { id } = useAppSelector((state) => state.idReducer);
  const id = window.location.pathname.match(/\d{2,}/)[0];
  // const id = router.pathname;
  const { data, isLoading, error } = cardsAPI.useFetchCardByIdQuery(id);
  const card = data?.data[0] || cardState;

  const addDefaultSrc: ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.src = fallback.src;
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

  // const handleHistoryBack = () => {
  //   navigate(-1);
  // };

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
      {/* <div onClick={handleHistoryBack} className={styles.overlay} /> */}
      <Link href="/" className={styles.overlay} />
      <div className={`${styles.fixed} ${defineType(card.type)}`}>
        <div className={styles.info}>
          <Image
            width={260}
            height={330}
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

export default Details;
