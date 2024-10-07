'use client';

import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks'; // Import useAppSelector to access user state
import { updateUserField, setUser } from '../../../store/userSlice'; // Import updateUserField and setUser actions
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user); // Access global user state from Redux

  // Local state to store the password
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string>(''); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send login request to backend
      const response = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username, // Get the username from Redux state
          password, // Send the password from local state
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed');
        return;
      }

      const data = await response.json();

      // Store the auth_token in cookies
      document.cookie = `auth_token=${data.auth_token}; path=/; max-age=${60 * 60 * 24 * 30}; secure=false; SameSite=Lax;`;

      // Dispatch setUser action to save user data to Redux
      dispatch(setUser({
        id: data.user.id,  // Store the user id
        username: data.user.username,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        group: data.user.groups[0],  // Assuming it's a single group
      }));

      // Clear password from local state after successful login
      setPassword('');

      // Redirect based on user's group
      if (data.user.groups[0] === 2) {
        // If user belongs to 'Organization User' group (group ID 2), redirect to Create Organization page
        router.push('/organization');
      } else {
        // Otherwise, redirect to Project List page
        router.push('/project-list');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred.');
    }
  };

  // Handle input changes for the username field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Dynamically update the username in Redux state using the updateUserField action
    dispatch(updateUserField({ field: name as keyof typeof user, value }));
  };

  return (
    <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-black text-center mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        
        {/* Username */}
        <input
          type="text"
          name="username" // Add name attribute for Redux state updates
          value={user.username}
          onChange={handleInputChange}  // Update Redux state for username
          placeholder="Username"
          className="w-full p-3 border text-black border-gray-300 rounded-lg"
          required
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Locally managed password
          placeholder="Password"
          className="w-full p-3 border text-black border-gray-300 rounded-lg"
          required
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
          Login
        </Button>
      </form>
    </main>
  );
}
