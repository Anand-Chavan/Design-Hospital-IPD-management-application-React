import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../Utils/AxiosConfig';

interface UserDetailsState {
    loading: boolean;
    error: string | null;
}

const initialState: UserDetailsState = {
    loading: false,
    error: null,
};

export const updateUserDetails = createAsyncThunk(
    'userDetails/updateUserDetails',
    async (requestBodyForUserDetails: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/users', JSON.stringify(requestBodyForUserDetails));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const postUserDetails = createAsyncThunk(
    'userDetails/postUserDetails',
    async (requestBodyForUserDetails: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user_details', JSON.stringify(requestBodyForUserDetails));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                toast.success('User Updated successfully!');
            })
            .addCase(updateUserDetails.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                toast.success('User details posted successfully!');
            })
            .addCase(postUserDetails.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userDetailsSlice.reducer;
