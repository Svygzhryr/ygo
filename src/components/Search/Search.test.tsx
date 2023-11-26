import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { cards } from 'src/mocks/mockedData';
import { renderWithProviders } from 'src/utils/test-utils';

import { Search } from '.';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Search', () => {
  test('Input displays correctly', async () => {
    renderWithProviders(<Search />);

    const placeholderText = await screen.findByRole('textbox');
    expect(placeholderText).toBeInTheDocument();
  });
});
