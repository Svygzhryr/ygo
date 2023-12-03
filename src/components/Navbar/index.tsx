import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <Link to="/controlled">
        <button className={`${styles.button} ${styles.signup}`}>Sign the Contract</button>
      </Link>
      <Link className={styles.logo} to="/">
        Sweet<span className={styles.soul}>Soul</span>
      </Link>
      <Link to="/uncontrolled">
        <button className={styles.button}>Terminate the Contract</button>
      </Link>
    </div>
  );
};
