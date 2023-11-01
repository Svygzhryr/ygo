import { Component } from 'react';

import styles from './ErrorFallback.module.scss';

interface IErrorBoundaryState {
  error: Error | null;
}

export default class ErrorFallback extends Component<IErrorBoundaryState, object> {
  constructor(props: IErrorBoundaryState) {
    super(props);
  }

  handleOnClick = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>An error has occurred:</h1>
        <pre>{this.props.error?.message}</pre>
        <button onClick={this.handleOnClick}>Click to reload the page.</button>
      </div>
    );
  }
}
