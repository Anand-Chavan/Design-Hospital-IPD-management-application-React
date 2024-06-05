import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { LoginRequest, loginResToSend } from '../Utils/ApiRes';

interface UserDetailsResponse {
  data: {
    created_at: string;
    email: string;
    id: number;
    jti: string;
    updated_at: string;
    role: string;
  };
  message: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<loginResToSend, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: {
          user: {
            email: credentials.email,
            password: credentials.password,
          },
        },
      }),
      transformResponse: (response: loginResToSend, meta: FetchBaseQueryMeta) => {
        const token = meta?.response?.headers.get('Authorization') || null;
        return { status: response.status, token: token || '' };
      },
    }),
    getUserDetails: builder.query<UserDetailsResponse, number>({
      query: (userId) => ({
        url: `/user_details/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: UserDetailsResponse) => {
        return response;
      },
    }),
  }),
});

export const { useLoginUserMutation, useGetUserDetailsQuery } = api;
