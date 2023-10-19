import { Component } from 'react';
import { IErrorBoundaryState } from '../../types/types';

export default class ErrorFallback extends Component<IErrorBoundaryState, object> {
  constructor(props: IErrorBoundaryState) {
    super(props);
  }
  // const navigate = useNavigate();

  // const handleOnClick = (): void => {
  //   navigate(Routes.HOME);

  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 700);
  // };

  render() {
    return (
      <div>
        <h1>An error has occurred:</h1>
        <pre>{this.props.error?.message}</pre>
        {/* <Button onClick={handleOnClick}>Click to return to the Home page..</Button> */}
      </div>
    );
  }
}
