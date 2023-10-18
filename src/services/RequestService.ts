import axios from 'axios';
import { ICardAPI } from '../types/types';

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export default class RequestService {
  static async getCardList(limit = 10, offset = 0) {
    try {
      const response = axios.get<ICardAPI>(`${API_URL}`, {
        params: {
          num: limit,
          offset,
        },
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}
