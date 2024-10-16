// src/app/organization/[id]/page.tsx

'use client';

import OrganizationDetail from '../../../components/OrganizationDetail'; // Reuse your component
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../../../store/hooks';
import { Button } from '../../ui/button'

export default function OrganizationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const organization = useAppSelector((state) => state.organization);
  const user = useAppSelector((state) => state.user);

  if (!organization || organization.id !== Number(params.id)) {
    return (
      <div>
        <p>No organization found.</p>
        <Button onClick={() => router.push('/organization')}>Go back</Button>
      </div>
    );
  }

  return <OrganizationDetail organizationProp={organization} />;
}

