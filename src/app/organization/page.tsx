// src/app/organization/page.tsx (Server Component)

import { cookies } from 'next/headers'; // To access cookies in App Router
import { redirect } from 'next/navigation'; // For handling redirects
import CreateOrganization from '../../components/CreateOrganization'; // Client component

export default async function OrganizationPage() {
  const cookieStore = cookies();
  const auth_token = cookieStore.get('auth_token')?.value;

  if (!auth_token) {
    redirect('/login');
    return null;
  }

  // Fetch the user's organization
  const res = await fetch('http://localhost:8000/organizations/user/', {
    method: 'GET',
    headers: {
      Authorization: `Token ${auth_token}`,
    },
  });

  let organization = null;

  if (res.ok) {
    organization = await res.json();
  }

  // If no organization exists, render CreateOrganization
  if (!organization) {
    return <CreateOrganization />;
  }

  // If organization exists, redirect to the dynamic [id] route to show organization details
  redirect(`/organization/${organization.id}`);
}
