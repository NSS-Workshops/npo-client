'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the user state
interface UserState {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  group: string;  // Add group field
  loggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
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
    // Updated setUser to include group
    setUser(
      state, 
      action: PayloadAction<{ username: string; email: string; first_name: string; last_name: string; group: string }>
    ) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.group = action.payload.group;  // Set group
      state.loggedIn = true;
    },
    logout(state) {
      state.username = '';
      state.email = '';
      state.first_name = '';
      state.last_name = '';
      state.group = '';  // Clear group on logout
      state.loggedIn = false;
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
