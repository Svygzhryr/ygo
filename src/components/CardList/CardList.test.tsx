import '@testing-library/jest-dom';
// eslint-disable-next-line react/no-deprecated
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CardList } from '.';
import { CardContext } from '../../contexts/cardContext';
import { cards, emptyCards } from '../../mocks/mockedData';

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

    const gotCards = screen.getAllByRole('img');
    expect(gotCards).toHaveLength(11);
  });

  test('Defined message appears if no cards are displayed', () => {
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
