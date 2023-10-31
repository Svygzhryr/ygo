import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from './Details.module.scss';

export const Details: FC = () => {
  return (
    <div className={styles.wrapper}>
      <SkeletonTheme baseColor="#1b1b1b" highlightColor="#303030">
        <Skeleton className={styles.skeletonCard} />
        {Array(6)
          .fill(true)
          .map((_, i) => (
            <Skeleton key={i} className={styles.skeletonText} />
          ))}
      </SkeletonTheme>
    </div>
  );
};
