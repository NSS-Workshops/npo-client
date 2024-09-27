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

    // Local state for password and organization name (if applicable)
    const [password, setPassword] = useState<string>('');
    const [organization, setOrganization] = useState<string>('');  // Organization name input for org users
    const [error, setError] = useState<string>('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Prepare the user data object
            const userData: any = {
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password,
                groups: [user.group === 'Developer' ? 1 : 2]  // Map group to corresponding ID (1 for Developer, 2 for Organization User)
            };

            // Conditionally add the organization field if the user is an Organization User
            if (user.group === 'Organization User') {
                userData.organization = organization;  // Only include organization for org users
            }

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

            // Dispatch the setUser action to store the user data globally
            dispatch(setUser({ 
                username: data.username, 
                email: data.email, 
                first_name: data.first_name, 
                last_name: data.last_name, 
                group: data.group,  // Store the selected group in Redux state
            }));

            // Redirect based on group
            if (user.group === 'Organization User') {
                router.push('/create-organization');  // Redirect to create organization page for org users
            } else {
                router.push('/dashboard');  // Redirect developers to dashboard
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

                {/* Group Selection */}
                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Register as</label>
                    <select
                        value={user.group}
                        onChange={(e) => dispatch(setUser({ ...user, group: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                        <option value="Developer">Developer</option>
                        <option value="Organization User">Organization User</option>
                    </select>
                </div>

                {/* Organization Name */}
                {user.group === 'Organization User' && (
                    <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}  
                        placeholder="Organization Name"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                    />
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
                    Register
                </Button>
            </form>
        </main>
    );
}
