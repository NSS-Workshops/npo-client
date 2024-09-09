// src/app/login/page.tsx

'use client'; // Enable client-side interactivity in Next.js

import React from 'react';

const LoginPage: React.FC = () => {
    const handleLogin = () => {
        // Redirect to your Django endpoint that starts the GitHub OAuth flow
        window.location.href = 'http://localhost:8000/github/login'; // Replace with your actual Django backend URL
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Login with GitHub
            </button>
        </div>
    );
};

export default LoginPage;
