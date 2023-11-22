import Link from 'next/link';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.title}>
      <h2>Page not found..</h2>
      <Link href="/">
        <button>Back to cards!</button>
      </Link>
    </div>
  );
};

export default NotFound;
