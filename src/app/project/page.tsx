'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProject, updateProjectField } from '../../store/projectSlice';  // Import the actions for project state
import { RootState } from '../../store/store';

const CreateProject = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Access the logged-in user, organization, and project data from Redux
    const user = useAppSelector((state: RootState) => state.user);
    const organization = useAppSelector((state: RootState) => state.organization);
    const project = useAppSelector((state: RootState) => state.project);

    // Local state for handling error messages
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;
        dispatch(updateProjectField({ field, value }));  // Dynamically update Redux state
    };

    // Handle form submission for creating the project
    const handleCreateProject = async (e: React.FormEvent) => {
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

        if (!organization || !organization.id) {
            setError('Organization is not selected or organization ID is missing.');
            return;
        }

        try {
            // Prepare the project data including the user and organization IDs
            const projectData = {
                name: project.name,
                description: project.description,
                user: user.id,  // Attach the logged-in user's ID
                organization: organization.id,  // Attach the organization ID
            };

            const response = await fetch('http://localhost:8000/projects/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,  // Send token for authentication
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Project creation failed');
                return;
            }

            const data = await response.json();

            // Dispatch the created project data to Redux
            dispatch(setProject({
                id: data.id,
                name: data.name,
                description: data.description,
                repository_url: data.repository_url,
                organization: data.organization,
                user: data.user,
            }));

            // Redirect after successful project creation
            router.push(`/project/${data.id}`);
        } catch (err) {
            console.error('Project creation error:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Create a New Project</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleCreateProject} className="space-y-4">
                {/* Project Name */}
                <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder="Project Name"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Project Description */}
                <input
                    type="text"
                    value={project.description}
                    onChange={(e) => handleInputChange(e, 'description')}
                    placeholder="Project Description"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
                    Create Project
                </Button>
            </form>
        </main>
    );
};

export default CreateProject;

