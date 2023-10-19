import React, { ChangeEvent, Component } from 'react';
import styles from './Search.module.scss';

interface ISearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
}

export default class Search extends Component<ISearchProps, object> {
  constructor(props: ISearchProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <input
          className={styles.input}
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button className={styles.button} onClick={this.props.onClick.bind(this)}>
          Search
        </button>
      </div>
    );
  }
}
