import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ICard } from 'src/types/types';
import { renderWithProviders } from 'src/utils/test-utils';
import { card } from 'srcmocks/mockedData';

import { CardItem } from '.';

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
