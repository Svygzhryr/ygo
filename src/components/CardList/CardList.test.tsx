import '@testing-library/jest-dom';
// eslint-disable-next-line react/no-deprecated
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CardList } from '.';
import { renderWithProviders } from '../../utils/test-utils';

describe('CardList tests', () => {
  test('Card list displays correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    await waitFor(async () => {
      const gotCard = screen.getByText('"A" Cell Breeding Device');
      expect(gotCard).toBeInTheDocument();

      const anotherCard = screen.getByText('3-Hump Lacooda');
      expect(anotherCard).toBeInTheDocument();
    });
  });

  test('Check if itemsPerPage buttons are disabling upon clicking', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    await waitFor(async () => {
      const threeItemsButton = await screen.findByText('3');
      fireEvent.click(threeItemsButton);

      expect(threeItemsButton).toBeDisabled();
    });
  });
});
