import { ChangeEvent, FC, KeyboardEventHandler, useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks/redux';
import { currentPageSlice } from 'src/store/reducers/PaginationSlice';
import { searchSlice } from 'src/store/reducers/SearchSlice';
import { MainSearch } from 'srcpages/MainPage';

import styles from './Search.module.scss';

export const Search: FC = () => {
  const [searchTemp, setSearchTemp] = useState('');
  // const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchValue } = searchSlice.actions;
  const { setCurrentPage } = currentPageSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageSearchValue = localStorage.getItem('prevSearch') || '';
    if (storageSearchValue) {
      dispatch(setSearchValue(storageSearchValue));
      setSearchTemp(storageSearchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClick = async () => {
    const params: MainSearch = {
      page: String(1),
    };

    if (searchTemp) {
      params.search = searchTemp;
    }

    dispatch(setCurrentPage(0));
    dispatch(setSearchValue(searchTemp));
    // setSearchParams(params);
    setSearchValue(searchTemp);
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
