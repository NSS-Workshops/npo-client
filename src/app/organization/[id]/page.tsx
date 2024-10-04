'use client';

import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useRouter } from 'next/navigation';
import { RootState } from '../../../store/store';
import { Button } from '../../ui/button';


const OrganizationDetail = () => {
    const router = useRouter();
    
    // Access the organization data from Redux store
    const user = useAppSelector((state: RootState) => state.user);
    const organization = useAppSelector((state: RootState) => state.organization);

    // If no organization is found in the state, redirect or show a message
    if (!organization || !organization.id) {
        return (
            <div>
                <p>No organization data found.</p>
                <Button onClick={() => router.push('/organization')}>Create Organization</Button>
            </div>
        );
    }

    return (
        <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Organization Details</h1>
            <div className="space-y-4">
                <p><strong>Name:</strong> {organization.name}</p>
                <p><strong>Website:</strong> <a href={organization.website} className="text-blue-500">{organization.website}</a></p>
                <p><strong>Address:</strong> {organization.address}</p>
                <p><strong>City:</strong> {organization.city}</p>
                <p><strong>State:</strong> {organization.state}</p>
            </div>

            {/* Add button to navigate to the project list or home */}
            <Button onClick={() => router.push('/project-list')} className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg">
                Go to Project List
            </Button>
        </main>
    );
};

export default OrganizationDetail;
