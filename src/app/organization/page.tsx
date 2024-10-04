'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setOrganization, updateOrgField } from '../../store/organizationSlice';  // Import the updateOrgField action
import { RootState } from '../../store/store';

export default function CreateOrganization() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Access the logged-in user and organization from Redux
    const user = useAppSelector((state: RootState) => state.user);
    const organization = useAppSelector((state: RootState) => state.organization);

    // Local error state
    const [error, setError] = useState<string>('');

    // Fetch auth token from cookies
    const getAuthTokenFromCookies = (): string | null => {
        const authToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('auth_token='))
            ?.split('=')[1];
        return authToken || null;
    };

    // Handle input changes and update the Redux store
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateOrgField({ field: name as keyof typeof organization, value })); // Dynamically update organization fields
    };

    // Handle form submission
    const handleCreateOrganization = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const authToken = getAuthTokenFromCookies();

        if (!authToken) {
            setError('Authentication token not found. Please log in.');
            return;
        }

        if (!user || !user.id) {
            setError('User is not logged in or user ID is missing.');
            return;
        }

        try {
            // Prepare the organization data including the user ID
            const organizationData = {
                name: organization.name,
                website: organization.website,
                address: organization.address,
                city: organization.city,
                state: organization.state,
                user: user.id,  // Attach the logged-in user's ID
            };

            const response = await fetch('http://localhost:8000/organizations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,  // Send token for authentication
                },
                body: JSON.stringify(organizationData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Organization creation failed');
                return;
            }

            const data = await response.json();

            // Dispatch the created organization data to Redux, including the user ID
            dispatch(setOrganization({
                id: data.id,
                name: data.name,
                website: data.website,
                address: data.address,
                city: data.city,
                state: data.state,
                user: data.user,  // User ID attached to the organization
            }));

            // Redirect after successful organization creation
            router.push(`/organization/${data.id}`);
        } catch (err) {
            console.error('Organization creation error:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Create Your Organization</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleCreateOrganization} className="space-y-4">
                {/* Organization Name */}
                <input
                    type="text"
                    name="name"  // Name matches Redux field
                    value={organization.name}
                    onChange={handleInputChange}  // Dynamically update the field in Redux
                    placeholder="Organization Name"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Website */}
                <input
                    type="url"
                    name="website"  // Name matches Redux field
                    value={organization.website}
                    onChange={handleInputChange}  // Dynamically update the field in Redux
                    placeholder="Website"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Address */}
                <input
                    type="text"
                    name="address"  // Name matches Redux field
                    value={organization.address}
                    onChange={handleInputChange}  // Dynamically update the field in Redux
                    placeholder="Address"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* City */}
                <input
                    type="text"
                    name="city"  // Name matches Redux field
                    value={organization.city}
                    onChange={handleInputChange}  // Dynamically update the field in Redux
                    placeholder="City"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* State */}
                <input
                    type="text"
                    name="state"  // Name matches Redux field
                    value={organization.state}
                    onChange={handleInputChange}  // Dynamically update the field in Redux
                    placeholder="State"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
                    Create Organization
                </Button>
            </form>
        </main>
    );
}
