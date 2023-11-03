import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import next from '../../assets/next.svg';
import prev from '../../assets/prev.svg';
import { getCards } from '../../services/RequestService';
import { ICard, ICardMeta } from '../../types/types';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  searchValue: string;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  meta: ICardMeta | null;
  setMeta: React.Dispatch<React.SetStateAction<ICardMeta | null>>;
}

export const Pagination: FC<IPaginationProps> = ({ meta, setMeta, setCards, searchValue }) => {
  const location = useLocation();

  if (!meta) {
    throw new Error("Cat't get card data..");
  }

  const [isLoading, setIsLoading] = useState(false);
  const currentPage = meta.total_pages + 1 - meta.pages_remaining;
  const navigate = useNavigate();

  const handlePrevPage = () => {
    setIsLoading(true);
    getCards(12, meta?.previous_page_offset, searchValue).then((response) => {
      setCards(response.data.data);
      setMeta(response.data.meta);
      setIsLoading(false);
    });
  };

  const handleNextPage = () => {
    setIsLoading(true);
    getCards(12, meta?.next_page_offset, searchValue).then((response) => {
      setCards(response.data.data);
      setMeta(response.data.meta);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    navigate(
      `${location.pathname}?page=${currentPage}${searchValue ? `&search=${searchValue}` : ''}`
    );
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevPage} disabled={currentPage <= 1 || isLoading}>
        {isLoading ? <div className={styles.loader}></div> : <img src={prev} />}
      </button>
      <button disabled={true}>{currentPage}</button>
      <button onClick={handleNextPage} disabled={currentPage >= meta.total_pages + 1 || isLoading}>
        {isLoading ? <div className={styles.loader}></div> : <img src={next} />}
      </button>
    </div>
  );
};
