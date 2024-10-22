// src/app/logout/page.tsx

'use client'

import React from 'react';
import { useRouter } from 'next/navigation'; // Using Next.js router
import { useAppDispatch } from '../../../store/hooks'; // Correct path to hooks
import { clearUser } from '../../../store/userSlice'
import { clearOrganization } from '../../../store/organizationSlice'; // Correct path to organization slice
import { clearProject } from '../../../store/projectSlice'; // Correct path to project slice

const Logout: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Clear the auth token from cookies
    document.cookie = 'auth_token=; Max-Age=-99999999; path=/;';

    // Clear Redux state
    dispatch(clearUser()); // Clears user state
    dispatch(clearOrganization()); // Clears organization state
    dispatch(clearProject()); // Clears project state

    // Redirect to login page
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default Logout;
