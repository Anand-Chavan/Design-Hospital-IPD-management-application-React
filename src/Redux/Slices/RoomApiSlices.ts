import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RoomData {
  id?: string;
  room_type: string;
  description: string;
  charges: number;
  capacity: number;
}

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    addRoom: builder.mutation<RoomData, Partial<RoomData>>({
      query: (room) => ({
        url: 'rooms',
        method: 'POST',
        body: { room },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') as string,
        },
      }),
    }),
    updateRoom: builder.mutation<RoomData, Partial<RoomData>>({
      query: ({ id, ...room }) => ({
        url: `rooms/${id}`,
        method: 'PUT',
        body: { room },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') as string,
        },
      }),
    }),
  }),
});

export const { useAddRoomMutation, useUpdateRoomMutation } = roomApi;
