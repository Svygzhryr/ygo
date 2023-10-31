import { Component } from 'react';

import { IErrorBoundaryState } from '../../types/types';
import styles from './ErrorFallback.module.scss';

export default class ErrorFallback extends Component<IErrorBoundaryState, object> {
  constructor(props: IErrorBoundaryState) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    window.location.reload();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>An error has occurred:</h1>
        <pre>{this.props.error?.message}</pre>
        <button onClick={this.handleOnClick}>Click to go back..</button>
      </div>
    );
  }
}
