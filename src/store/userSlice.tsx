// src/store/userSlice.ts
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the user state
interface UserState {
  id: number | null;  // Add id to the state
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  group: string;  // Add group field
  loggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  id: null,  // Initialize id as null
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  group: '',  // Initialize as an empty string
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set all user fields, including id
    setUser: (state, action: PayloadAction<{ id: number; username: string; email: string; first_name: string; last_name: string; group: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.group = action.payload.group;
      state.loggedIn = true;
    },

    // Dynamically update individual fields
    updateUserField: (state, action: PayloadAction<{ field: keyof UserState; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },

    logout: (state) => {
      state.id = null;
      state.username = '';
      state.email = '';
      state.first_name = '';
      state.last_name = '';
      state.group = '';
      state.loggedIn = false;
    },
  },
});


// Export actions and reducer
export const { setUser, logout, updateUserField } = userSlice.actions;
export default userSlice.reducer;
