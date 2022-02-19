import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'zs1jojgr24',
  apiKey: process.env.API_KEY,
});
