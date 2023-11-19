import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Details } from '.';
import { card, cards } from '../../mocks/mockedData';
import { renderWithProviders } from '../../utils/test-utils';

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
