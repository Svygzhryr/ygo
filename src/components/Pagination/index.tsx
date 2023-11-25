import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import next from 'src/assets/next.svg';
import prev from 'src/assets/prev.svg';
import { ICardMeta } from 'src/types/types';

import styles from './Pagination.module.scss';

interface IPaginationProps {
  meta: ICardMeta | null | undefined;
}

export const Pagination: FC<IPaginationProps> = ({ meta }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(+router.query.page! || 0);
  const searchParams = useSearchParams();

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    router.query.page = `${currentPage + 1}`;
    router.push(
      {
        pathname: '/',
        query: { ...router.query },
      },
      undefined,
      {}
    );
  }, [currentPage]);

  if (!meta) {
    return <h1>Can't get card data...</h1>;
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevPage} disabled={currentPage <= 0}>
        {/* {isFetching ? <div className={styles.loader}></div> : <Image alt="<" src={prev} />} */}
        <Image alt="<" src={prev} />
      </button>
      <button disabled={true}>{searchParams?.get('page') || 0 + 1}</button>
      <button onClick={handleNextPage} disabled={meta?.pages_remaining === 0}>
        {/* {isFetching ? <div className={styles.loader}></div> : } */}
        <Image alt=">" src={next} />
      </button>
    </div>
  );
};
