import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Search } from '.';
import { CardContext } from '../../contexts/cardContext';
import { cards } from '../../mocks/mockedData';

const value = '';
const onChange = jest.fn() as (e: ChangeEvent<HTMLInputElement>) => void;
const onClick = jest.fn();
const onKeyDown = jest.fn();

describe('Search', () => {
  test('Input displays correctly', async () => {
    render(
      <BrowserRouter>
        <CardContext.Provider value={cards}>
          <Search value={value} onChange={onChange} onClick={onClick} onKeyDown={onKeyDown} />
        </CardContext.Provider>
      </BrowserRouter>
    );

    const placeholderText = await screen.findByRole('textbox');
    expect(placeholderText).toBeInTheDocument();
  });
});
