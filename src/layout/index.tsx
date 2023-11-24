import { PropsWithChildren } from 'react';
import { MainPage } from 'src/pages/mainpage';

interface ILayoutProps {
  children?: PropsWithChildren;
  newData: object;
}

function Layout({ children, newData }: ILayoutProps): JSX.Element {
  return (
    <>
      <MainPage newData={newData} />
      {children}
    </>
  );
}

export default Layout;
