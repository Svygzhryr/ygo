import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { NotFound } from '.';
import { App } from '../../app/App';
import { renderWithProviders } from '../../utils/test-utils';

describe('Not Found', () => {
  test('Page displays correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const backToCards = screen.getByText('Back to cards!');
    expect(backToCards).toBeInTheDocument();
  });

  test('404 page upon navigating an invalid route', () => {
    const badRoute = '/some/bad/route' as string;
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    const backToCards = screen.getByText('Back to cards!');
    expect(backToCards).toBeInTheDocument();

    const notFoundMessage = screen.getByText('Page not found..');
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('return to MainPage from NotFound page via button', async () => {
    const badRoute = '/some/bad/route';
    const { container, queryByText } = renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {
      const backButton = screen.getByRole('button', { name: 'Back to cards!' });
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    await waitFor(() => {
      const appTitle = queryByText('Yu-Gi-Oh card catalog');

      expect(appTitle).toBeInTheDocument();
      expect(container).toHaveTextContent('Yu-Gi-Oh card catalog');
    });
  });
});
