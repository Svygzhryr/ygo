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
              return (
                <div key={card.id} className={styles.cardItem}>
                  <img
                    className={styles.cardItemImg}
                    src={card.card_images[0].image_url}
                    alt={card.name}
                    loading="lazy"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
