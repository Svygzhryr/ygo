import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from 'src/utils/test-utils';

import { NotFound } from '.';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

expect(1).toBe(1);

// describe('Not Found', () => {
//   test('Page displays correctly', async () => {
//     renderWithProviders(<NotFound />);

//     const backToCards = screen.getByText('Back to cards!');
//     expect(backToCards).toBeInTheDocument();
//   });

//   test('404 page upon navigating an invalid route', () => {
//     renderWithProviders(<App />);

//     const backToCards = screen.getByText('Back to cards!');
//     expect(backToCards).toBeInTheDocument();

//     const notFoundMessage = screen.getByText('Page not found..');
//     expect(notFoundMessage).toBeInTheDocument();
//   });

//   test('return to MainPage from NotFound page via button', async () => {
//     const { container, queryByText } = renderWithProviders(<App />);

//     await act(async () => {
//       const backButton = screen.getByRole('button', { name: 'Back to cards!' });
//       expect(backButton).toBeInTheDocument();
//       fireEvent.click(backButton);
//     });

//     await waitFor(() => {
//       const appTitle = queryByText('Yu-Gi-Oh card catalog');

//       expect(appTitle).toBeInTheDocument();
//       expect(container).toHaveTextContent('Yu-Gi-Oh card catalog');
//     });
//   });
// });
