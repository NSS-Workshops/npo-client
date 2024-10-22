'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'; // Redux hooks
import { setProject } from '../store/projectSlice'; // Redux action to set project in store
import { RootState } from '../store/store'; // RootState from Redux store
import { Button } from '../app/ui/button';
import { useRouter } from 'next/navigation';

// Props interface for ProjectDetail component, following the same pattern as OrganizationDetail
interface ProjectDetailProps {
  projectProp: {
    id: number | null;
    name: string;
    description: string;
    repository_url: string;
    organization: number | null; // ID of the associated organization
    user: number | null;  // ID of the user creating the project
  };
  organizationId: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectProp, organizationId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Hydrate project state on mount
  useEffect(() => {
    dispatch(setProject(projectProp)); // Pass the projectProp to Redux state
  }, []);

  // Access the hydrated project, organization, and user states from Redux
  const project = useAppSelector((state: RootState) => state.project); // Access project from state
  const organization = useAppSelector((state: RootState) => state.organization); // Access organization from state
  const user = useAppSelector((state: RootState) => state.user); // Access user from Redux state

  // Render the component with hydrated Redux state
  return (
    <main className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Project Details</h1>

      {/* Display Project Information */}
      <div className="space-y-4 mt-4">
        <h2 className="text-xl font-bold">Project Information</h2>
        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Repository URL:</strong> <a href={project.repository_url} className="text-blue-500">{project.repository_url}</a></p>
      </div>

      {/* Display User Information from Redux */}
      <div className="space-y-4 mt-4">
        <h2 className="text-xl font-bold">User Information</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Display Organization Information from Redux */}
      <div className="space-y-4 mt-4">
        <h2 className="text-xl font-bold">Organization Information</h2>
        <p><strong>Name:</strong> {organization.name}</p>
        <p><strong>Website:</strong> <a href={organization.website} className="text-blue-500">{organization.website}</a></p>
        <p><strong>Address:</strong> {organization.address}</p>
        <p><strong>City:</strong> {organization.city}</p>
        <p><strong>State:</strong> {organization.state}</p>
      </div>

      {/* Button to navigate back to organization */}
      <Button onClick={() => router.push(`/organization/${organizationId}`)} className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg">
        Back to Organization
      </Button>
    </main>
  );
};

export default ProjectDetail;


