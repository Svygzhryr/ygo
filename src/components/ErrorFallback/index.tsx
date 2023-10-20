import { Component } from 'react';
import styles from './ErrorFallback.module.scss';
import { IErrorBoundaryState } from '../../types/types';

export default class ErrorFallback extends Component<IErrorBoundaryState, object> {
  constructor(props: IErrorBoundaryState) {
    super(props);
  }

  handleOnClick() {
    window.location.reload();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>An error has occurred:</h1>
        <pre>{this.props.error?.message}</pre>
        <button onClick={this.handleOnClick.bind(this)}>Click to go back..</button>
      </div>
    );
  }
}
