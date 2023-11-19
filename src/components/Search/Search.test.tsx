import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Search } from '.';
import { cards } from '../../mocks/mockedData';
import { renderWithProviders } from '../../utils/test-utils';

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
