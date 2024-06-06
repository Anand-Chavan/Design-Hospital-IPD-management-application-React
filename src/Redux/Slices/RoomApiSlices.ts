import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RoomData {
  id?: string;
  room_type: string;
  description: string;
  charges: number;
  capacity: number;
}

export const roomsApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', localStorage.getItem('token') as string);
      return headers;
  },
  }),
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
    getRooms: builder.query({
      query: () => ({
        url: '/rooms',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') as string,
        },
      }),
    }),
    deleteRoom: builder.mutation({
      query: (roomId) => ({
        url: `/rooms/${roomId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') as string,
        },
      }),
    }),
  }),
});

export const { useAddRoomMutation, useUpdateRoomMutation, useGetRoomsQuery, useDeleteRoomMutation } = roomsApi;
