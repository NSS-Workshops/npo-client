'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function CreateOrganizationPage() {
    const router = useRouter();
    const [organizationName, setOrganizationName] = useState<string>('');
    const [organizationDescription, setOrganizationDescription] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleCreateOrganization = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8000/organizations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: organizationName,
                    description: organizationDescription,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Organization creation failed');
                return;
            }

            // Redirect to the organization dashboard or homepage after creation
            router.push('/dashboard');  // Change this path according to your needs
        } catch (err) {
            console.error('Organization creation error:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Create Organization</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleCreateOrganization} className="space-y-4">
                {/* Organization Name */}
                <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Organization Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                />

                {/* Organization Description */}
                <textarea
                    value={organizationDescription}
                    onChange={(e) => setOrganizationDescription(e.target.value)}
                    placeholder="Organization Description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
