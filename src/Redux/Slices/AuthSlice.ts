// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserDetailsById } from '../../Utils/GetUserDetailsById';
import { AdminLogin, LoginResponse, Status } from '../../Utils/ApiRes';

interface AuthState {
    isAuthenticated: boolean;
    user: { token: string , loginData?:LoginResponse} | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('token') as string ? true : false,
    user: localStorage.getItem('token') as string ? { 
            token: (localStorage.getItem('token') as string),
            loginData : JSON.parse((localStorage.getItem('loginData') as string))
        } : null,
    error: null,
};

export const fetchUserDetailsById = createAsyncThunk(
    'auth/fetchUserDetailsById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await getUserDetailsById(id);
            return response;
        } catch (error) {
            return rejectWithValue('Error fetching user details');
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ token: string,loginData:LoginResponse }>) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            localStorage.setItem('token', (action.payload.token));
            localStorage.setItem('loginData', JSON.stringify(action.payload.loginData));
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetailsById.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserDetailsById.fulfilled, (state: any, action) => {
            state.isLoading = false;
            state.userDetails = action.payload;
        });
        builder.addCase(fetchUserDetailsById.rejected, (state: any, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
