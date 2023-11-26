import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'src/utils/test-utils';

import { Pagination } from '.';

const meta = {
  current_rows: 12,
  total_rows: 12850,
  rows_remaining: 12838,
  total_pages: 1070,
  pages_remaining: 1070,
  next_page: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=12&offset=12&fname=',
  next_page_offset: 12,
};

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Pagination', () => {
  test('Page number displays correctly', async () => {
    renderWithProviders(<Pagination meta={meta} />);

    const getCurrentPage = await screen.findByText('1');
    expect(getCurrentPage).toBeInTheDocument();
  });

  test('Button click', async () => {
    renderWithProviders(<Pagination meta={meta} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});
