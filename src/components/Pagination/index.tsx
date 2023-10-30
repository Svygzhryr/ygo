import { FC } from 'react';

// import { useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import { ICard, ICardMeta } from '../../types/types';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  searchValue: string;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  meta: ICardMeta | null;
  setMeta: React.Dispatch<React.SetStateAction<ICardMeta | null>>;
}

export const Pagination: FC<IPaginationProps> = ({ meta, setMeta, setCards, searchValue }) => {
  if (!meta) {
    throw new Error("Cat't get card data..");
  }

  const currentPage = meta.total_pages + 1 - meta.pages_remaining;
  // const navigate = useNavigate();

  const handlePrevPage = async () => {
    await RequestService.getCards(12, meta?.previous_page_offset, searchValue).then((response) => {
      setCards(response.data.data);
      setMeta(response.data.meta);
    });
    // navigate(`/?page=${currentPage}`);
  };

  const handleNextPage = async () => {
    await RequestService.getCards(12, meta?.next_page_offset, searchValue).then((response) => {
      setCards(response.data.data);
      setMeta(response.data.meta);
    });
    // navigate(`/?page=${currentPage}`);
  };

  console.log(meta);
  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevPage} disabled={currentPage <= 1}>
        &lt;
      </button>
      <button disabled={true}>{currentPage}</button>
      <button onClick={handleNextPage} disabled={currentPage >= meta.total_pages + 1}>
        &gt;
      </button>
    </div>
  );
};
