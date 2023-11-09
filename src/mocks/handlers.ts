// src/mocks/handlers.js
import { http } from 'msw';

export const handlers = [
  http.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', () => {
    console.log('Captured request');
    return new Response('Got cards');
  }),
];
