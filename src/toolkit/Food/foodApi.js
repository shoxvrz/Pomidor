import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://66adf655b18f3614e3b65836.mockapi.io/pomidor' }), 
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => '/foodData',
    }),
  }),
});

export const { useGetAllDataQuery } = foodApi;
