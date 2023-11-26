import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ErrorFallback from '.';

describe('Pagination', () => {
  test('Pagination click changes the url', async () => {
    const error = new Error('Test error here!');
    render(<ErrorFallback error={error} />);

    const catchedError = await screen.findByText(error.message);
    expect(catchedError).toBeInTheDocument();
  });
});
