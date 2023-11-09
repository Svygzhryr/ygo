import '@testing-library/jest-dom';
import { cleanup, findByText, fireEvent, getByText, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MainPage } from '.';

afterEach(() => {
  cleanup();
});

describe('Main', () => {
  test('Page displays top bar correctly', async () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    const dataElement = await screen.findByText('Search');
    expect(dataElement).toBeVisible();
  });
});
