import React, { Component } from 'react';
import { ICard } from '../../types/types';
import styles from './CardList.module.scss';

interface ICardListProps {
  cards: ICard[];
}

export default class CardList extends Component<ICardListProps> {
  constructor(props: ICardListProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.cardListWrapper}>
          {this.props.cards.map((card) => {
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
          })}
        </div>
      </div>
    );
  }
}
