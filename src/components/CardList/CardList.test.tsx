import '@testing-library/jest-dom';
// eslint-disable-next-line react/no-deprecated
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { serverSideProps } from 'src/mocks/mockedData';
import { IServerSideData } from 'src/types/types';
import { renderWithProviders } from 'src/utils/test-utils';

import { CardList } from '.';

const { cardsData } = serverSideProps;

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('CardList tests', () => {
  test('Card list displays correctly', async () => {
    renderWithProviders(<CardList newData={cardsData as unknown as IServerSideData} />);

    await waitFor(async () => {
      const gotCard = screen.getByText('"A" Cell Breeding Device');
      expect(gotCard).toBeInTheDocument();

      const anotherCard = screen.getByText('3-Hump Lacooda');
      expect(anotherCard).toBeInTheDocument();
    });
  });

  test('Check if itemsPerPage buttons are disabling upon clicking', async () => {
    renderWithProviders(<CardList newData={cardsData as unknown as IServerSideData} />);

    await waitFor(async () => {
      const threeItemsButton = await screen.findByText('3');
      fireEvent.click(threeItemsButton);

      expect(threeItemsButton).toBeDisabled();
    });
  });
});
