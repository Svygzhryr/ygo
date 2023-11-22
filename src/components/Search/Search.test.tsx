import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from 'src/utils/test-utils';
import { cards } from 'srcmocks/mockedData';

import { Search } from '.';

describe('Search', () => {
  test('Input displays correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const placeholderText = await screen.findByRole('textbox');
    expect(placeholderText).toBeInTheDocument();
  });
});
