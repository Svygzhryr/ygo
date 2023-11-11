import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.title}>
      <h2>Page not found..</h2>
      <Link to="/">
        <button>Back to cards!</button>
      </Link>
    </div>
  );
};
