// src/app/organization/[id]/project/page.tsx (Server Component)

import { cookies } from 'next/headers'; // To access cookies in App Router
import { redirect } from 'next/navigation';
import ProjectDetail from '../../../../components/ProjectDetail'; // Client Component for project details
import CreateProject from '../../../../components/CreateProject'; // Client Component for project creation

export default async function ProjectPage() {
  const cookieStore = cookies();
  const auth_token = cookieStore.get('auth_token')?.value;

  if (!auth_token) {
    redirect('/login');
    return null;
  }

  try {
    // Fetch the project for the user using the /projects/user-projects/ endpoint
    const res = await fetch(`http://localhost:8000/projects/user-projects/`, {
      headers: {
        Authorization: `Token ${auth_token}`, // Pass the auth token in the headers
      },
    });

    if (res.status === 404) {
      // If no project exists, render the CreateProject component
      return <CreateProject />;
    }

    if (!res.ok) {
      throw new Error('Failed to fetch project');
    }

    // Parse the response to get the project data
    const data = await res.json();
    const project = data.projects.length ? data.projects[0] : null;

    // If a project exists, render the ProjectDetail component
    return project ? <ProjectDetail projectProp={project} organizationId={project.organization} /> : <CreateProject />;
    
  } catch (error) {
    console.error("Error fetching project:", error);
    return <p>Something went wrong. Please try again later.</p>;
  }
}


