import '@testing-library/jest-dom';
// eslint-disable-next-line react/no-deprecated
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CardList } from '.';
import { CardContext } from '../../contexts/cardContext';
import { ICard } from '../../types/types';

const cardList = [
  {
    id: 34541863,
    name: '"A" Cell Breeding Device',
    type: 'Spell Card',
    frameType: 'spell',
    desc: 'During each of your Standby Phases, put 1 A-Counter on 1 face-up monster your opponent controls.',
    race: 'Continuous',
    archetype: 'Alien',
    card_sets: [
      {
        set_name: 'Force of the Breaker',
        set_code: 'FOTB-EN043',
        set_rarity: 'Common',
        set_rarity_code: '(C)',
        set_price: '1.31',
      },
    ],
    card_images: [
      {
        id: 34541863,
        image_url: 'https://images.ygoprodeck.com/images/cards/34541863.jpg',
        image_url_small: 'https://images.ygoprodeck.com/images/cards_small/34541863.jpg',
        image_url_cropped: 'https://images.ygoprodeck.com/images/cards_cropped/34541863.jpg',
      },
    ],
    card_prices: [
      {
        cardmarket_price: '0.11',
        tcgplayer_price: '0.19',
        ebay_price: '0.99',
        amazon_price: '24.45',
        coolstuffinc_price: '0.25',
      },
    ],
  },
  {
    id: 64163367,
    name: '"A" Cell Incubator',
    type: 'Spell Card',
    frameType: 'spell',
    desc: 'Each time an A-Counter(s) is removed from play by a card effect, place 1 A-Counter on this card. When this card is destroyed, distribute the A-Counters on this card among face-up monsters.',
    race: 'Continuous',
    archetype: 'Alien',
    card_sets: [
      {
        set_name: "Gladiator's Assault",
        set_code: 'GLAS-EN062',
        set_rarity: 'Common',
        set_rarity_code: '(C)',
        set_price: '2.1',
      },
    ],
    card_images: [
      {
        id: 64163367,
        image_url: 'https://images.ygoprodeck.com/images/cards/64163367.jpg',
        image_url_small: 'https://images.ygoprodeck.com/images/cards_small/64163367.jpg',
        image_url_cropped: 'https://images.ygoprodeck.com/images/cards_cropped/64163367.jpg',
      },
    ],
    card_prices: [
      {
        cardmarket_price: '0.07',
        tcgplayer_price: '0.22',
        ebay_price: '1.25',
        amazon_price: '0.50',
        coolstuffinc_price: '0.25',
      },
    ],
  },
  {
    id: 86988864,
    name: '3-Hump Lacooda',
    type: 'Effect Monster',
    frameType: 'effect',
    desc: 'If there are 3 face-up "3-Hump Lacooda" cards on your side of the field, Tribute 2 of them to draw 3 cards.',
    atk: 500,
    def: 1500,
    level: 3,
    race: 'Beast',
    attribute: 'EARTH',
    card_sets: [
      {
        set_name: 'Ancient Sanctuary',
        set_code: 'AST-070',
        set_rarity: 'Common',
        set_rarity_code: '(C)',
        set_price: '1.07',
      },
      {
        set_name: 'Dark Revelation Volume 2',
        set_code: 'DR2-EN183',
        set_rarity: 'Common',
        set_rarity_code: '(C)',
        set_price: '1.24',
      },
    ],
    card_images: [
      {
        id: 86988864,
        image_url: 'https://images.ygoprodeck.com/images/cards/86988864.jpg',
        image_url_small: 'https://images.ygoprodeck.com/images/cards_small/86988864.jpg',
        image_url_cropped: 'https://images.ygoprodeck.com/images/cards_cropped/86988864.jpg',
      },
    ],
    card_prices: [
      {
        cardmarket_price: '0.16',
        tcgplayer_price: '0.20',
        ebay_price: '1.00',
        amazon_price: '0.25',
        coolstuffinc_price: '0.25',
      },
    ],
  },
] as ICard[];

const cards = {
  searchValue: '',
  setSearchValue: () => {},
  cardList,
  setCardList: () => {},
};

const emptyCards = {
  searchValue: '',
  setSearchValue: () => {},
  cardList: [],
  setCardList: () => {},
};

const setMeta = jest.fn();

describe('CardList tests', () => {
  test('Card list displays correctly', async () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <CardList isLoading={false} meta={null} setMeta={setMeta} />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const cardName = screen.getByText(cardList[0].name);
    expect(cardName).toBeInTheDocument();
  });

  test('Monster card displays correctly', () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <CardList isLoading={false} meta={null} setMeta={setMeta} />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const cardName = screen.getByText(cardList[2].name);
    expect(cardName).toBeInTheDocument();
  });

  test('If no cards are displaying', () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={emptyCards}>
          <CardList isLoading={false} meta={null} setMeta={setMeta} />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const cardName = screen.getByText('No cards matching your query.');
    expect(cardName).toBeInTheDocument();
  });
});
