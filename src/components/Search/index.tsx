import { ChangeEvent, FC, KeyboardEventHandler, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { MainSearch } from '../../pages/MainPage';
import { cardsAPI } from '../../services/RequestService';
import { currentPageSlice } from '../../store/reducers/PaginationSlice';
import { searchSlice } from '../../store/reducers/SearchSlice';
import styles from './Search.module.scss';

// interface ISearchProps {
//   value: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   onClick: () => Promise<void>;
//   onKeyDown: KeyboardEventHandler<HTMLInputElement>;
// }

export const Search: FC = () => {
  const [searchTemp, setSearchTemp] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { newSetSearchValue } = searchSlice.actions;
  const { setCurrentPage } = currentPageSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageSearchValue = localStorage.getItem('prevSearch') || '';
    if (storageSearchValue) {
      dispatch(newSetSearchValue(storageSearchValue));
      setSearchTemp(storageSearchValue);
    }
  }, []);

  const handleOnClick = async () => {
    const params: MainSearch = {
      page: String(1),
    };

    if (searchTemp) {
      params.search = searchTemp;
    }

    dispatch(setCurrentPage(0));
    dispatch(newSetSearchValue(searchTemp));
    setSearchParams(params);
    newSetSearchValue(searchTemp);
    localStorage.setItem('prevSearch', searchTemp || '');
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') handleOnClick();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTemp(e.target.value);
  };

  return (
    <div>
      <h3 className={styles.title}>Yu-Gi-Oh card catalog</h3>
      <input
        className={styles.input}
        type="text"
        value={searchTemp}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="Type in something..."
      />
      <button className={styles.button} onClick={handleOnClick}>
        Search
      </button>
    </div>
  );
};
