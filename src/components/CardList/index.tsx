import React, { Component } from 'react';
import { ICard } from '../../types/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CardList.module.scss';

interface ICardListProps {
  cards: ICard[];
  isLoading: boolean;
}

export default class CardList extends Component<ICardListProps> {
  constructor(props: ICardListProps) {
    super(props);
  }

  defineType(type: string) {
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
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.cardListWrapper}>
          {this.props.isLoading ? (
            <SkeletonTheme baseColor="#1b1b1b" highlightColor="#303030">
              {Array(12)
                .fill(true)
                .map((_, i) => (
                  <Skeleton key={i} className={styles.skeleton} />
                ))}
            </SkeletonTheme>
          ) : (
            this.props.cards.map((card) => {
              console.log(card.type);
              return (
                <div
                  key={card.id}
                  className={`${styles.cardItemWrapper} ${this.defineType(card.type)}`}
                >
                  <div
                    className={`${styles.cardItem} ${
                      card.type.includes('Monster') ? styles.typeMonsterDecoration : null
                    }`}
                  >
                    <img
                      className={styles.cardItemImg}
                      src={card.card_images[0].image_url_cropped}
                      alt={card.name}
                      loading="lazy"
                    />
                    <h6 className={styles.cardItemName}>{card.name}</h6>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
