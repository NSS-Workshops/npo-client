// src/app/organization/page.tsx (Server Component)

import { cookies } from 'next/headers'; // To access cookies in App Router
import { redirect } from 'next/navigation'; // For handling redirects
import OrganizationDetail from '../../components/OrganizationDetail'; // Client component
import CreateOrganization from '../../components/CreateOrganization'; // Client component

export default async function OrganizationPage() {
  const cookieStore = cookies();
  const auth_token = cookieStore.get('auth_token')?.value;

  if (!auth_token) {
    redirect('/login');
    return null;
  }

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

  // Render CreateOrganization if no organization exists
  if (!organization) {
    return <CreateOrganization />;
  }

  // Pass the organization data to the OrganizationDetail component
  return <OrganizationDetail organizationProp={organization} />;
}

