import { FC } from 'react';

import { ICard } from '../../types/types';
import styles from './CardItem.module.scss';

interface CardItemProps {
  card: ICard;
}

export const CardItem: FC<CardItemProps> = ({ card }) => {
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

  return (
    <div key={card.id} className={`${styles.cardItemWrapper} ${defineType(card.type)}`}>
      <div
        className={`${styles.cardItem} ${
          card.type.includes('Monster') ? styles.typeMonsterDecoration : null
        }`}
      >
        <img
          className={styles.cardItemImg}
          src={card.card_images[0].image_url_cropped}
          loading="lazy"
          alt=""
        />
        <h6 className={styles.cardItemName}>{card.name}</h6>
        <div className={`${styles.cardItemType} ${defineAttribute(card.attribute)}`}>
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
