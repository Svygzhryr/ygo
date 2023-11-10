import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Details } from '.';
import { CardContext } from '../../contexts/cardContext';
import { card, cards } from '../../mocks/mockedData';

describe('Details', () => {
  test('Card details displays correctly', async () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <Details />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const getCardDesc = await screen.findByRole('img');
    console.log(getCardDesc);
    expect(getCardDesc).toBeInTheDocument();
  });
});
