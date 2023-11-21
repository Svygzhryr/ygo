import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { itemsPerPageSlice } from '../../store/reducers/ItemsPerPageSlice';
import styles from './ItemsPerPage.module.scss';

export const ItemsPerPage = () => {
  const { setThreeItems, setSixItems, setTwelveItems } = itemsPerPageSlice.actions;
  const { itemsPerPage } = useAppSelector((state) => state.itemsPerPageReducer);

  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <button disabled={itemsPerPage === 3} onClick={() => dispatch(setThreeItems())}>
        3
      </button>
      <button disabled={itemsPerPage === 6} onClick={() => dispatch(setSixItems())}>
        6
      </button>
      <button disabled={itemsPerPage === 12} onClick={() => dispatch(setTwelveItems())}>
        12
      </button>
    </div>
  );
};
