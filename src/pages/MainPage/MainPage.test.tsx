import { act, fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { serverSideProps } from 'src/mocks/mockedData';
import { IServerSideProps } from 'src/types/types';
import { renderWithProviders } from 'src/utils/test-utils';

import { MainPage } from '.';

const newData = serverSideProps;

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Main page tests', () => {
  test('Main page receives list of cards via gSSR query requests', async () => {
    await act(async () => renderWithProviders(<MainPage newData={newData} />));

    const card = await screen.findByText('30,000-Year White Turtle');
    expect(card).toBeInTheDocument();

    const card2 = await screen.findByText('1st Movement Solo');
    expect(card2).toBeInTheDocument();

    const card3 = await screen.findByText('4-Starred Ladybug of Doom');
    expect(card3).toBeInTheDocument();

    fireEvent(card, new MouseEvent('click', { bubbles: true }));
    const desc = await screen.findByText(/If there are 3/);
    expect(desc).toBeInTheDocument();
  });

  test('A message displays correctly if no cards has been found', async () => {
    await act(async () => renderWithProviders(<MainPage newData={undefined} />));

    await waitFor(async () => {
      const emptyMessage = await screen.findByText('No cards matching your query.');
      expect(emptyMessage).toBeInTheDocument();
    });
  });

  test('An error throws upon clicking an error-throwing button', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(<MainPage newData={newData} />);

    const errorButton = screen.getByText('Throw an error!');

    expect(() => fireEvent.click(errorButton)).toThrow(Error);
  });
});
