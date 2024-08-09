import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://66adf655b18f3614e3b65836.mockapi.io/pomidor'}),
    endpoints: (builder) => ({
        getAllData: builder.query({
            query: () => '/users',
        })
    })
})

export const {useGetAllDataQuery} = usersApi;