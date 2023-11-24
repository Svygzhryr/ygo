import { GetServerSideProps } from 'next';
import Layout from 'src/layout';
import { wrapper } from 'src/store/store';
import { IServerSideData } from 'src/types/types';

import Details from '../components/CardDetails/CardDetails';
import { fetchAllCards, getRunningQueriesThunk } from './api/api';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { num, page, fname } = context.query;

    console.log(context);

    const data = await store.dispatch(
      fetchAllCards.initiate({
        num: +num! || 12,
        offset: +page! || 0,
        fname: fname ? `${fname}` : '',
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: data,
    };
  }
);

const Home = (newData: IServerSideData) => {
  return <Layout newData={newData} />;
};

export default Home;
