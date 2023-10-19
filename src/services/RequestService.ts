import axios from 'axios';
import { ICardAPI } from '../types/types';

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export default class RequestService {
  static async getCards(limit = 12, offset = 0, search = '') {
    try {
      const response = axios.get<ICardAPI>(`${API_URL}`, {
        params: {
          num: limit,
          offset,
          fname: search,
        },
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}
