import { PropsWithChildren } from 'react';
import { MainPage } from 'src/pages/mainpage';

function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default Layout;
