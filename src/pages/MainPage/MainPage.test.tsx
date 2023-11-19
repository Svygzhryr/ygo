import { act, fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MainPage } from '.';
import { renderWithProviders } from '../../utils/test-utils';

describe('Main page tests', () => {
  test('Main page receives list of cards via RTK query requests', async () => {
    await act(async () =>
      renderWithProviders(
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      )
    );

    await waitFor(async () => {
      const card = await screen.findByText('30,000-Year White Turtle');
      expect(card).toBeInTheDocument();

      const card2 = await screen.findByText('1st Movement Solo');
      expect(card2).toBeInTheDocument();

      const card3 = await screen.findByText('4-Starred Ladybug of Doom');
      expect(card3).toBeInTheDocument();
    });
  });

  test('A message displays correctly if no cards has been found', async () => {
    await act(async () =>
      renderWithProviders(
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      )
    );

    const input = await screen.findByRole('textbox');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: {
        value: 'xcvxcvxvxv',
      },
    });

    const searchButton = await screen.findByText('Search');
    fireEvent.click(searchButton);

    await waitFor(async () => {
      const emptyMessage = await screen.findByText('No cards matching your query.');
      expect(emptyMessage).toBeInTheDocument();
    });
  });
});
