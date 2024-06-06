import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface StaffData {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    phone_no: string;
    email: string;
    password: string;
    user_id?: number;
    role_id?: number
}

interface ApiResponseForUsers {
    status: {
        message: string;
        data: {
            id: number;
            email: string;
            created_at: string;
            updated_at: string;
            jti: string;
        };
        errors?: string[];
    };
}

export const staffApi = createApi({
    reducerPath: 'staffApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers) => {
            headers.set('Authorization', localStorage.getItem('token') as string);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        addStaff: builder.mutation<ApiResponseForUsers, Partial<StaffData>>({
            query: (staff) => ({
                url: '/users',
                method: 'POST',
                body: { user: staff },
            }),
        }),
        addStaffDetails: builder.mutation<ApiResponseForUsers, Partial<StaffData>>({
            query: (details) => ({
                url: '/user_details',
                method: 'POST',
                body: { user_detail: details },
            }),
        }),
        editStaffDetails: builder.mutation<ApiResponseForUsers, { id: number; details: Partial<StaffData> }>({
            query: ({ id, details }) => ({
                url: `/user_details/${id}`,
                method: 'PUT',
                body: { user_detail: details },
                responseHandler: (response) => response.text(),
            }),
        }),
    }),
});

export const { useAddStaffMutation, useAddStaffDetailsMutation, useEditStaffDetailsMutation } = staffApi;
