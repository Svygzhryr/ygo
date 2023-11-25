import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { itemsPerPageSlice } from 'src/store/reducers/ItemsPerPageSlice';

import styles from './ItemsPerPage.module.scss';

export const ItemsPerPage = () => {
  const router = useRouter();
  const { setThreeItems, setSixItems, setTwelveItems } = itemsPerPageSlice.actions;
  // const { itemsPerPage } = useAppSelector((state) => state.itemsPerPageReducer);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    router.query.num = `${itemsPerPage}`;
    router.push(
      {
        pathname: '/',
        query: { ...router.query },
      },
      undefined,
      {}
    );
  }, [itemsPerPage]);

  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <button disabled={itemsPerPage === 3} onClick={() => setItemsPerPage(3)}>
        3
      </button>
      <button disabled={itemsPerPage === 6} onClick={() => setItemsPerPage(6)}>
        6
      </button>
      <button disabled={itemsPerPage === 12} onClick={() => setItemsPerPage(12)}>
        12
      </button>
    </div>
  );
};
