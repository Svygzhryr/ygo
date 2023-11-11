import { createContext } from 'react';

import { ICard } from '../types/types';

export interface ICardContext {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  cardList: ICard[];
  setCardList: (cardList: ICard[]) => void;
}

export const CardContext = createContext<ICardContext>({
  searchValue: '',
  setSearchValue: () => {},
  cardList: [],
  setCardList: () => {},
});
