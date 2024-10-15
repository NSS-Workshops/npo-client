// src/app/organization/layout.tsx
import { cookies } from 'next/headers'; // Access cookies for auth token
import { ReactNode } from 'react';

// Layout Component for organization pages
export default function OrganizationLayout({ children }: { children: ReactNode }) {
  const auth_token = cookies().get('auth_token')?.value;

  if (!auth_token) {
    return <div>You need to log in to view this page.</div>;
  }

  return (
    <div>
      <nav>
        {/* Add navigation links or sidebar for organization-specific routes */}
        <a href="/organization">Organization Dashboard</a>
        <a href="/project">Projects</a>
      </nav>
      <main>{children}</main>
    </div>
  );
}
