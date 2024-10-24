'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'; // Redux hooks
import { setOrganization } from '../store/organizationSlice'; // Redux action to set organization in store
import { RootState } from '../store/store'; // RootState from Redux store
import { Button } from '../app/ui/button';
import { useRouter } from 'next/navigation';

// Props interface for OrganizationDetail component
interface OrganizationDetailProps {
  organizationProp: {
    id: number | null;
    name: string;
    website: string;
    address: string;
    city: string;
    state: string;
    user : number | null;
  };
}

const OrganizationDetail: React.FC<OrganizationDetailProps> = ({ organizationProp }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Hydrate organization state when component mounts
  useEffect(() => {
    dispatch(setOrganization(organizationProp)); // Hydrate Redux organization state
  }, []);

  // Access organization and user from Redux state
  const organization = useAppSelector((state: RootState) => state.organization);
  const user = useAppSelector((state: RootState) => state.user);

  // Render the component with hydrated Redux state
  return (
    <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Organization Details</h1>

      {/* Display User Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">User Information</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Display Organization Information */}
      <div className="space-y-4 mt-4">
        <h2 className="text-xl font-bold">Organization Information</h2>
        <p><strong>Name:</strong> {organization.name}</p>
        <p><strong>Website:</strong> <a href={organization.website} className="text-blue-500">{organization.website}</a></p>
        <p><strong>Address:</strong> {organization.address}</p>
        <p><strong>City:</strong> {organization.city}</p>
        <p><strong>State:</strong> {organization.state}</p>
      </div>

      {/* Button to navigate back or to project list */}
      <Button onClick={() => router.push(`/organization/${organization.id}/project`)} className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg">
        Go to Projects
      </Button>
    </main>
  );
};

export default OrganizationDetail;
