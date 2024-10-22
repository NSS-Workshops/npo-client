'use client';

import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setUser, updateUserField } from '../../../store/userSlice'; // Import updateUserField action

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch(); // Use Redux dispatch to update global state
    const user = useAppSelector((state) => state.user); // Access global user state from Redux

    // Local state for password (handled outside Redux)
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Add console log to check if function is called
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        console.log('Register button clicked');

        try {
            // Prepare the user data to send to the backend for registration
            const userData = {
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password,  // Password is stored locally, not in Redux
                groups: [user.group === 'Organization User' ? 2 : 1],  // Use IDs for groups
            };

            console.log('Sending registration data:', userData);

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
                console.error('Registration failed:', errorData);
                return;
            }

            const data = await response.json();
            console.log('Registration successful, data:', data);

            // Step 1: Automatically log the user in after registration
            const loginResponse = await fetch('http://localhost:8000/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,  // Login with the same credentials
                    password: password,
                }),
            });

            if (!loginResponse.ok) {
                const errorData = await loginResponse.json();
                setError(errorData.message || 'Login after registration failed');
                console.error('Login after registration failed:', errorData);
                return;
            }

            const loginData = await loginResponse.json();
            console.log('Login successful:', loginData);

            // Store the auth_token in cookies
            document.cookie = `auth_token=${loginData.auth_token}; path=/; max-age=${60 * 60 * 24 * 30}; secure=false; SameSite=Lax;`;

            // Step 2: Update Redux state with registered and logged-in user info
            dispatch(setUser({
                id: loginData.user.id,  // Store user id
                username: loginData.user.username,
                email: loginData.user.email,
                first_name: loginData.user.first_name,
                last_name: loginData.user.last_name,
                group: loginData.user.groups[0],  // Assuming single group
            }));

            // Step 3: Redirect based on group after successful login
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

    // Handle input changes for user fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(updateUserField({ field: name as keyof typeof user, value }));  // Update Redux state dynamically using the updateUserField action
    };

    return (
        <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-black text-center mb-6">Register</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                {/* Username */}
                <input
                    type="text"
                    name="username"  // Add name attribute for dynamic updates
                    value={user.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full p-3 border text-black border-gray-300 rounded-lg"
                    required
                />

                {/* Email */}
                <input
                    type="email"
                    name="email"  // Add name attribute
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-3 border text-black border-gray-300 rounded-lg"
                    required
                />

                {/* First Name */}
                <input
                    type="text"
                    name="first_name"  // Add name attribute
                    value={user.first_name}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-3 border text-black border-gray-300 rounded-lg"
                    required
                />

                {/* Last Name */}
                <input
                    type="text"
                    name="last_name"  // Add name attribute
                    value={user.last_name}
                    onChange={handleInputChange}
                    placeholder="Last Name"
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

                {/* Group Selection */}
                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Register as</label>
                    <select
                        name="group"  // Add name attribute for dynamic updates
                        value={user.group}
                        onChange={handleInputChange}
                        className="w-full p-3 border text-black border-gray-300 rounded-lg"
                    >
                        <option value="Developer">Developer</option>
                        <option value="Organization User">Organization User</option>
                    </select>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
                    Register
                </Button>
            </form>
        </main>
    );
}

