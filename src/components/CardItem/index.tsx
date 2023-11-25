import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactEventHandler } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import fallback from 'src/assets/fallback.jpg';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { idSlice } from 'src/store/reducers/IdSlice';
import { ICard, ILogo } from 'src/types/types';

import styles from './CardItem.module.scss';

interface CardItemProps {
  card: ICard;
}

export const CardItem: FC<CardItemProps> = ({ card }) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useAppDispatch();
  const { setId } = idSlice.actions;
  const router = useRouter();

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

  const defineAttribute = (attribute: string) => {
    switch (attribute) {
      case 'DARK':
        return styles.attrDark;
      case 'DIVINE':
        return styles.attrDivine;
      case 'EARTH':
        return styles.attrEarth;
      case 'FIRE':
        return styles.attrFire;
      case 'LIGHT':
        return styles.attrLight;
      case 'WATER':
        return styles.attrWater;
      case 'WIND':
        return styles.attrWind;
    }
  };

  const addDefaultSrc: ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.src = fallback.src;
    }
  };

  const handleCardClick = () => {
    const id = card.id;
    dispatch(setId(id));
    router.query.details = `${id}`;
    router.push(
      {
        pathname: '/',
        query: { ...router.query },
      },
      undefined,
      {}
    );
  };

  return (
    <div
      // href={`/details/${card.id}`}
      key={card.id}
      className={`${styles.cardItemWrapper} ${defineType(card.type)}`}
      onClick={handleCardClick}
    >
      <div
        className={`${styles.cardItem} ${
          card.type.includes('Monster') ? styles.typeMonsterDecoration : null
        }`}
      >
        <Image
          width={150}
          height={150}
          className={styles.cardItemImg}
          onError={addDefaultSrc}
          src={card.card_images[0].image_url_cropped}
          loading="eager"
          alt=""
        />
        <h6 className={styles.cardItemName}>{card.name}</h6>
        <div className={`${styles.cardItemType} ${defineAttribute(card.attribute || '')}`}>
          {card.attribute?.toLowerCase() || card.type.match('Spell') || card.type.match('Trap')}
        </div>
        {card.type.includes('Monster') && (
          <div className={styles.statsWrapper}>
            <div className={`${styles.statAtk} ${styles.stat}`}>{card.atk}</div>
            <div className={`${styles.statDef} ${styles.stat}`}>{card.def ?? 'n/a'}</div>
          </div>
        )}
      </div>
    </div>
  );
};
