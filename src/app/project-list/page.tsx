'use client';

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';  // Import useSelector to access the Redux store
import { RootState } from '../../store/store';  // Import the RootState type if using TypeScript

export default function ProjectDetailPage() {
    const router = useRouter();

    // Access the user slice from Redux store
    const user = useSelector((state: RootState) => state.user);

    return (
        <main>
            {/* Display user information */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">
                    Welcome, {user.first_name} {user.last_name}!
                </h1>
                <p className="text-lg">
                    Your email: {user.email}
                </p>
                <p className="text-md">
                    Your group: {user.group}
                </p>
            </div>

            {/* Project Detail Section */}
            <div className="flex flex-col items-center justify-evenly p-24">
                <h2 className="text-3xl font-bold">Project Details</h2>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h3>Project 1</h3>
                    <p>Description of project 1, it is a great project, etc.</p>
                </div>
            </div>
        </main>
    );
}
