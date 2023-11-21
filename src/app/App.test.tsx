import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithProviders } from '../utils/test-utils';
import { App } from './App';

describe('App', () => {
  test('App title dispays correctly', () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const appTitle = screen.getByText('Yu-Gi-Oh card catalog');
    expect(appTitle).toBeInTheDocument();
  });
});
