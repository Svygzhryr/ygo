import { act, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MainPage } from '.';
import { renderWithProviders } from '../../utils/test-utils';

test('Main page receives list of cards via RTK query requests', async () => {
  await act(async () =>
    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    )
  );
  screen.debug();
});
