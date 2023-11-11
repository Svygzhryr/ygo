import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CardItem } from '.';
import { CardContext } from '../../contexts/cardContext';
import { card, cards } from '../../mocks/mockedData';
import { ICard } from '../../types/types';

describe('Card Item', () => {
  test('Monster card and its data displays correctly', () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <CardItem card={card as ICard} />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const { name, atk, def } = card;

    const cardName = screen.getByText(name);
    expect(cardName).toBeInTheDocument();

    const cardAtk = screen.getByText(atk as number);
    expect(cardAtk).toBeInTheDocument();

    const cardDef = screen.getByText(def as number);
    expect(cardDef).toBeInTheDocument();
  });
});
