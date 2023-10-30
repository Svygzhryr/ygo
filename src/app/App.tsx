import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';
import { MainPage } from '../pages/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);

export const App: FC = () => {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
};
