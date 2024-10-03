'use client';

import React, { useState } from 'react';  
import { Button } from '../../ui/button'; 
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setUser } from '../../../store/userSlice'; // Import setUser action

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch(); // Use Redux dispatch to update global state
    const user = useAppSelector((state) => state.user); // Access global user state from Redux

    // Local state for password
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Prepare the user data to send to the backend
            const userData = {
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password,  // Password is stored locally, not in Redux
                groups: [user.group === 'Organization User' ? 2 : 1],  // Use IDs for groups, assuming 1 = Developer, 2 = Organization User
            };

            // Send the form data to your backend's register endpoint
            const response = await fetch('http://localhost:8000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed');
                return;
            }

            const data = await response.json();

            // Dispatch the setUser action to store the user data globally, including the id
            dispatch(setUser({ 
                id: data.id,  // Store the user id
                username: data.username, 
                email: data.email, 
                first_name: data.first_name, 
                last_name: data.last_name, 
                group: data.group,  // Store the selected group in Redux state
            }));

            // Step 1: Automatically log the user in
            const loginResponse = await fetch('http://localhost:8000/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,  // Login with the same credentials
                    password: password
                }),
            });

            if (!loginResponse.ok) {
                const errorData = await loginResponse.json();
                setError(errorData.message || 'Login after registration failed');
                return;
            }

            const loginData = await loginResponse.json();

            // Step 2: Update Redux state with logged-in user info, including the id
            dispatch(setUser({
                id: loginData.user.id,  // Store user id
                username: loginData.user.username,
                email: loginData.user.email,
                first_name: loginData.user.first_name,
                last_name: loginData.user.last_name,
                group: loginData.user.groups[0],  // Assuming single group
            }));

            // Step 3: Redirect based on group
            if (loginData.user.groups[0] === 2) {  // Organization User
                router.push('/organization');  // Redirect to create organization page
            } else {
                router.push('/project-list');  // Redirect developers to dashboard
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                {/* Form Inputs for User Fields */}
                {/* Username */}
                <input
                    type="text"
                    value={user.username}
                    onChange={(e) => dispatch(setUser({ ...user, username: e.target.value }))}
                    placeholder="Username"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Email */}
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => dispatch(setUser({ ...user, email: e.target.value }))}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* First Name */}
                <input
                    type="text"
                    value={user.first_name}
                    onChange={(e) => dispatch(setUser({ ...user, first_name: e.target.value }))}
                    placeholder="First Name"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Last Name */}
                <input
                    type="text"
                    value={user.last_name}
                    onChange={(e) => dispatch(setUser({ ...user, last_name: e.target.value }))}
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Password */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
                    Register
                </Button>
            </form>
        </main>
    );
}
