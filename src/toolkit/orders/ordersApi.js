import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://66b482189f9169621ea33d7a.mockapi.io' }), 
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => '/orders',
    }),
  }),
});

export const { useGetAllDataQuery } = ordersApi;
