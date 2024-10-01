// src/store/store.ts
'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user slice

export const store = configureStore({
    reducer: {
        user: userReducer,  // Add user slice reducer
    },
});

// TypeScript types for store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


