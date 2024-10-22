'use client';

import React, { useState } from 'react';
import { Button } from '../app/ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setProject, updateProjectField } from '../store/projectSlice'; // Redux actions
import { RootState } from '../store/store';

export default function CreateProject() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Access the project, organization, and user data from Redux
  const project = useAppSelector((state: RootState) => state.project);
  const organization = useAppSelector((state: RootState) => state.organization);
  const user = useAppSelector((state: RootState) => state.user); // Accessing the user data

  const [error, setError] = useState<string>('');

  // Handle input changes and update the Redux store for project fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateProjectField({ field: name as keyof typeof project, value }));
  };

  // Handle form submission
  const handleCreateProject = async (e: React.FormEvent) => {
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
      const projectData = {
        name: project.name,
        description: project.description,
        organization: organization.id, // Attach the current organization's ID
        user: user.id, // Attach the logged-in user's ID
      };

      const response = await fetch('http://localhost:8000/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Project creation failed');
        return;
      }

      const data = await response.json();
      dispatch(setProject(data)); // Save created project to Redux

      // Redirect to project details page
      router.push(`/organization/${organization.id}/project`);
    } catch (err) {
      console.error('Project creation error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Create Your Project</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Form to create a project */}
      <form onSubmit={handleCreateProject} className="space-y-4">
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="text"
          name="description"
          value={project.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />

        <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
          Create Project
        </Button>
      </form>
    </main>
  );
}
