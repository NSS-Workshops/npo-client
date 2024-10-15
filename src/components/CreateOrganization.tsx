'use client';

import React, { useState } from 'react';
import { Button } from '../app/ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setOrganization, updateOrgField } from '../store/organizationSlice'; // Redux actions
import { RootState } from '../store/store';

export default function CreateOrganization() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Access the organization and user data from Redux
  const organization = useAppSelector((state: RootState) => state.organization);
  const user = useAppSelector((state: RootState) => state.user);

  const [error, setError] = useState<string>('');

  // Handle input changes and update the Redux store for organization fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateOrgField({ field: name as keyof typeof organization, value }));
  };

  // Handle form submission
  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const authToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (!authToken) {
      setError('Authentication token not found. Please log in.');
      return;
    }

    try {
      const organizationData = {
        name: organization.name,
        website: organization.website,
        address: organization.address,
        city: organization.city,
        state: organization.state,
        user: user.id, // Attach the logged-in user's ID
      };

      const response = await fetch('http://localhost:8000/organizations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify(organizationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Organization creation failed');
        return;
      }

      const data = await response.json();
      dispatch(setOrganization(data)); // Save created organization to Redux
      router.push(`/organization/${data.id}`); // Redirect to organization details page
    } catch (err) {
      console.error('Organization creation error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Create Your Organization</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Form to create an organization */}
      <form onSubmit={handleCreateOrganization} className="space-y-4">
        <input
          type="text"
          name="name"
          value={organization.name}
          onChange={handleInputChange}
          placeholder="Organization Name"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="url"
          name="website"
          value={organization.website}
          onChange={handleInputChange}
          placeholder="Website"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="text"
          name="address"
          value={organization.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="text"
          name="city"
          value={organization.city}
          onChange={handleInputChange}
          placeholder="City"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="text"
          name="state"
          value={organization.state}
          onChange={handleInputChange}
          placeholder="State"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
          Create Organization
        </Button>
      </form>
    </main>
  );
}
