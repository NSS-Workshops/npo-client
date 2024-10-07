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

    // Handle form submission
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

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
                group: data.groups[0],  // Store the selected group in Redux state
            }));

            // Step 1: Automatically log the user in after registration
            const registerResponse = await fetch('http://localhost:8000/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,  // Login with the same credentials
                    password: password,
                }),
            });

            if (!registerResponse.ok) {
                const errorData = await registerResponse.json();
                setError(errorData.message || 'Login after registration failed');
                return;
            }

            const registerData = await registerResponse.json();

            // Step 2: Update Redux state with registered user info, including the id
            dispatch(setUser({
                id: registerData.user.id,  // Store user id
                username: registerData.user.username,
                email: registerData.user.email,
                first_name: registerData.user.first_name,
                last_name: registerData.user.last_name,
                group: registerData.user.groups[0],  // Assuming single group
            }));

            // Step 3: Redirect based on group after registration
            if (registerData.user.groups[0] === 2) {  // Organization User
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

