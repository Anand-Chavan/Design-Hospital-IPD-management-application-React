// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import {api} from '../Services/authService'
import { roomApi } from './Slices/RoomApiSlices';


const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).concat(roomApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
