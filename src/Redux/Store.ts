// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import {api} from '../Services/authService'

const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
