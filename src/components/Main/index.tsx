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
      <h1>Abandon hope all ye who enter here</h1>
    </div>
  );
};
