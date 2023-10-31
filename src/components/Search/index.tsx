import React, { ChangeEvent, Component, KeyboardEventHandler } from 'react';

import styles from './Search.module.scss';

interface ISearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export default class Search extends Component<ISearchProps, object> {
  constructor(props: ISearchProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 className={styles.title}>Yu-Gi-Oh card catalog</h3>
        <input
          className={styles.input}
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          placeholder="Type in something..."
        />
        <button className={styles.button} onClick={this.props.onClick}>
          Search
        </button>
      </div>
    );
  }
}
