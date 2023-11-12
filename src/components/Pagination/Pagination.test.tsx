import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Pagination } from '.';
import { CardContext } from '../../contexts/cardContext';
import { cards } from '../../mocks/mockedData';

const setMeta = jest.fn();
const meta = {
  current_rows: 12,
  total_rows: 12850,
  rows_remaining: 12838,
  total_pages: 1070,
  pages_remaining: 1070,
  next_page: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=12&offset=12&fname=',
  next_page_offset: 12,
};

describe('Pagination', () => {
  test('Page number displays correctly', async () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <Pagination meta={meta} setMeta={setMeta} />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const getCurrentPage = await screen.findByText('1');
    expect(getCurrentPage).toBeInTheDocument();
  });

  test('Button click', async () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <Pagination meta={meta} setMeta={setMeta} />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});
