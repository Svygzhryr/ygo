import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { serverSideCard } from 'src/mocks/mockedData';
import { renderWithProviders } from 'src/utils/test-utils';

import CardDetails from './CardDetails';

const data = serverSideCard;

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Details', () => {
  test('Card description displays correctly', async () => {
    renderWithProviders(<CardDetails data={data.data} />);

    const getCardDesc = await screen.findByText(/Target 1 face-up/);
    expect(getCardDesc).toBeInTheDocument();

    const cardImg = screen.getByRole('img');
    expect(cardImg).toBeInTheDocument();
  });
});
