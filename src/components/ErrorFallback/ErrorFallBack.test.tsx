import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ErrorFallback from '.';

describe('Pagination', () => {
  test('Pagination click changes the url', async () => {
    const error = new Error('Test error here!');
    render(
      <BrowserRouter>
        <ErrorFallback error={error} />
      </BrowserRouter>
    );

    const catchedError = await screen.findByText(error.message);
    expect(catchedError).toBeInTheDocument();
  });
});
