// src/app/organization/[id]/page.tsx (Server Component)

import { cookies } from 'next/headers'; // To access cookies in App Router
import { redirect } from 'next/navigation';
import OrganizationDetail from '../../../components/OrganizationDetail'; // Client component

export default async function OrganizationDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const auth_token = cookieStore.get('auth_token')?.value;

  if (!auth_token) {
    redirect('/login');
    return null;
  }

  try {
    // Fetch the organization details by the dynamic id (params.id)
    const res = await fetch(`http://localhost:8000/organizations/${params.id}/`, {
      headers: {
        Authorization: `Token ${auth_token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch organization');
    }

    const organization = await res.json();

    // Render the organization detail component
    return <OrganizationDetail organizationProp={organization} />;
  } catch (error) {
    console.error('Error fetching organization:', error);
    return <><p>Something went wrong. Please try again later.</p></>;
  }
}
