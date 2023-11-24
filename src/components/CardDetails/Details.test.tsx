import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from 'src/utils/test-utils';
import { card, cards } from 'srcmocks/mockedData';

import { Details } from './CardDetails';

describe('Details', () => {
  test('Error message displays correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    const getCardDesc = await screen.findByText("Can't retrieve card data..");
    expect(getCardDesc).toBeInTheDocument();
  });
});
