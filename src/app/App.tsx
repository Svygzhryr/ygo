import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';
import { CardContext } from '../contexts/cardContext';
import { Details } from '../pages/Details';
import { MainPage } from '../pages/MainPage';
import { NotFound } from '../pages/NotFound';
import { ICard } from '../types/types';

export const App: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cardList, setCardList] = useState<ICard[]>([]);

  const cards = {
    searchValue,
    setSearchValue,
    cardList,
    setCardList,
  };

  return (
    <>
      <CardContext.Provider value={cards}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="/details" element={<Details />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </CardContext.Provider>
    </>
  );
};
