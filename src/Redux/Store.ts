// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import {api} from '../Services/authService'
import { roomApi } from './Slices/RoomApiSlices';
import { staffApi } from './Slices/StaffSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [staffApi.reducerPath]: staffApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(api.middleware)
        .concat(roomApi.middleware)
        .concat(staffApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
