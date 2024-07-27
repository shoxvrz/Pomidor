import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), 
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => '/foodData',
    }),
  }),
});

export const { useGetAllDataQuery } = foodApi;
