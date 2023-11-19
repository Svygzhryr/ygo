import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CardItem } from '.';
import { card } from '../../mocks/mockedData';
import { ICard } from '../../types/types';
import { renderWithProviders } from '../../utils/test-utils';

describe('Card Item', () => {
  test('Monster card and its data displays correctly', () => {
    renderWithProviders(
      <BrowserRouter>
        <CardItem card={card as ICard} />
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
