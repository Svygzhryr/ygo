import { PropsWithChildren } from 'react';
import CardDetails from 'src/components/CardDetails/CardDetails';
import { MainPage } from 'src/pages/MainPage';
import { IServerSideData, IServerSideProps } from 'src/types/types';

interface ILayoutProps {
  children?: PropsWithChildren;
  newData: IServerSideProps;
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
