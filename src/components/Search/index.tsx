import { ChangeEvent, FC, KeyboardEventHandler } from 'react';

import styles from './Search.module.scss';

interface ISearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export const Search: FC<ISearchProps> = ({ value, onChange, onClick, onKeyDown }) => {
  return (
    <div>
      <h3 className={styles.title}>Yu-Gi-Oh card catalog</h3>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type in something..."
      />
      <button className={styles.button} onClick={onClick}>
        Search
      </button>
    </div>
  );
};
