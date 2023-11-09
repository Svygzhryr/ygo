import { getCards } from '../services/RequestService';

const apiRequest = async () => {
  const response = await getCards();
  return response.data.data;
};
