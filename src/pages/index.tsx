import { GetServerSideProps } from 'next';
import Layout from 'src/layout';
import { wrapper } from 'src/store/store';
import { IServerSideData, IServerSideProps } from 'src/types/types';

import Details from '../components/CardDetails/CardDetails';
import { fetchAllCards, fetchCardById, getRunningQueriesThunk } from './api/api';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { num, page, fname, details } = context.query;

    const cardsData = await store.dispatch(
      fetchAllCards.initiate({
        num: +num! || 12,
        offset: (+page! - 1) * 12 || 0,
        fname: fname ? `${fname}` : '',
      })
    );

    const singleCardData = await store.dispatch(fetchCardById.initiate(details as string));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cardsData,
        singleCardData,
      },
    };
  }
);

const Home = (newData: IServerSideProps) => {
  return <Layout newData={newData} />;
};

export default Home;
