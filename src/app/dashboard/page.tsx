// src/app/dashboard/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const DashboardPage = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const email = searchParams.get('email');

    const [repos, setRepos] = useState<any[]>([]); // State to store repositories or other data
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                console.log('Fetching repositories...');
                
                // Make a request to your Django backend to interact with GitHub API
                const response = await fetch('http://localhost:8000/api/fetch-repos', {
                    credentials: 'include', // Include cookies for session handling
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
                }

                const data = await response.json();
                setRepos(data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
            {email && <p>Email: {email}</p>}
            <h2 className="text-xl font-semibold mt-4">Your GitHub Repositories:</h2>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;
