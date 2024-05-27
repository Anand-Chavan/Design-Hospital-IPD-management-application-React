import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../Utils/AxiosConfig';

interface UserDetailsState {
    loading: boolean;
    error: string | null;
    // Define other state properties as needed
}

const initialState: UserDetailsState = {
    loading: false,
    error: null,
    // Initialize other state properties as needed
};

export const updateUserDetails = createAsyncThunk(
    'userDetails/updateUserDetails',
    async (requestBodyForUserDetails: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put('/user_details', JSON.stringify(requestBodyForUserDetails));
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
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                // Handle the success state, e.g., update the state with action.payload
                toast.success('User Updated successfully!');
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // Handle the error state
            });
    },
});

export default userDetailsSlice.reducer;
