import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { NotFound } from '.';

describe('Not Found', () => {
  test('404 page upon navigating an invalid route', async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const notFoundMessage = screen.getByText('Back to cards!');
    expect(notFoundMessage).toBeInTheDocument();
  });
});
