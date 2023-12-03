import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/redux';
import {
  controlledBase64,
  controlledData,
  uncontrolledBase64,
  uncontrolledData,
} from '../../redux/state';
import { IFormProps } from '../../utils/types';
import styles from './Main.module.scss';

export const Main = () => {
  const controlledOutput = useAppSelector(controlledData) as IFormProps;
  const uncontrolledOutput = useAppSelector(uncontrolledData) as IFormProps;
  const controlledImage = useAppSelector(controlledBase64);
  const uncontrolledImage = useAppSelector(uncontrolledBase64);

  if (controlledOutput.name || uncontrolledOutput.name) {
    return (
      <>
        <h1>Data output</h1>
        <h6>take a look at your agreements</h6>
        <div className={styles.outputWrapper}>
          <div className={styles.output}>
            <h2>Controlled:</h2>
            <ul className={styles.list}>
              <img className={styles.image} src={controlledImage} />
              {Object.entries(controlledOutput).map(([key, value]) => {
                if (key === 'file') {
                  return;
                }
                return (
                  <li key={key}>
                    <span className={styles.keys}>{`${key}:`}</span>
                    <span className={styles.values}>{`${value}`}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.output}>
            <h2>Uncontrolled:</h2>
            <ul className={styles.list}>
              <img className={styles.image} src={uncontrolledImage} />

              {Object.entries(uncontrolledOutput).map(([key, value]) => {
                if (key === 'file') {
                  return;
                }
                return (
                  <li key={key}>
                    <span className={styles.keys}>{`${key}:`}</span>
                    <span className={styles.values}>{`${value}`}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainTitle}>Welcome, lost one</h1>
      <div className={styles.welcomeWrapper}>
        <p>
          Have you always wanted to be the best at something? Maybe to become a chef, top tier
          racer, or maybe a president?
        </p>
        <p>Have you ever felt like you lack of time, or maybe motivation or patience?</p>
        <p>
          Fear not, for you have a great chance to achieve what you always wanted! And the best part
          is, it&apos;s completely* free**! All you need to do is fill a small little{' '}
          <Link className={styles.link} to="/controlled">
            contract
          </Link>
          , and I will take care of the rest..
        </p>
      </div>
      <div className={styles.footnote}>
        <br />
        <p>* - the only thing we take away is just soul. no money, vouchers or precious metals</p>
        <p>** - except for eternal servitude</p>
      </div>
    </div>
  );
};
