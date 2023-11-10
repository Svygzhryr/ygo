import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MainPage } from '.';
import { CardContext } from '../../contexts/cardContext';
import { cards } from '../../mocks/mockedData';

describe('Main', () => {
  test('Search bar working correctly', async () => {
    const { rerender } = render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <MainPage />
        </CardContext.Provider>
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Type in something...');
    fireEvent.change(input, { target: { value: 'lacooda' } });
    expect(input).toHaveValue('lacooda');

    const searchButton = await screen.findByText('Search');
    expect(searchButton).toBeInTheDocument();
    fireEvent(searchButton, new MouseEvent('click', { bubbles: true }));

    const foundCardDefence = await screen.findByText('3-Hump Lacooda');

    expect(foundCardDefence).toBeVisible();

    rerender(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <MainPage />
        </CardContext.Provider>
      </BrowserRouter>
    );

    expect(input).toHaveValue('lacooda');
  });

  test('Error fallback component', async () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <MainPage />
        </CardContext.Provider>
      </BrowserRouter>
    );

    console.error = jest.fn();

    const errorButton = await screen.findByText('Throw an error!');
    try {
      fireEvent(errorButton, new MouseEvent('click', { bubbles: true }));
    } catch (e) {
      expect((e as Error).message).toBe('Whoops! An error has occured.');
    }
  });
});
