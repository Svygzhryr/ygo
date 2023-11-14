import styles from './ItemsPerPage.module.scss';

export const ItemsPerPage = () => {
  return (
    <div className={styles.wrapper}>
      <button>3</button>
      <button>6</button>
      <button>12</button>
    </div>
  );
};
