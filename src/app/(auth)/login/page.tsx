// src/app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/userSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Local state to store the password temporarily
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Temporary state for password
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password, // Send password only during login
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();

      // Dispatch to setUser action to store non-sensitive user data globally in Redux
      dispatch(setUser({
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        group: data.group,  // Set group in Redux
      }));

      // Clear password from local state after successful login
      setPassword('');

      // Redirect user after successful login
      router.push('/project-list');
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        
        {/* Username */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Local state for password
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg"
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
