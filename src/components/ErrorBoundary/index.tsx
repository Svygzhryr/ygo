import { Component, ReactNode } from 'react';

import { IErrorBoundaryProps, IErrorBoundaryState } from '../../types/types';

export default class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public state: IErrorBoundaryState = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { error };
  }

  public render(): ReactNode {
    const { error } = this.state;
    const { children, FallbackComponent } = this.props;

    if (error) {
      return <FallbackComponent error={error} />;
    }

    return children;
  }

  // asddsadasdas
}
