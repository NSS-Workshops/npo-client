// src/app/(auth)/login/page.tsx

'use client';

import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '../../../store/hooks'; // Custom Redux hooks
import { setUser } from '../../../store/userSlice';  // Redux action

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();  // For dispatching Redux actions
    const user = useAppSelector((state) => state.user);  // Access the global user state from Redux

    const handleLogin = () => {
        // Here you would trigger login logic, or redirect to the login page.
        router.push('/login');
    };

    return (
        <main>
            <h1 className="flex justify-center text-2xl">Welcome to Nashville NPO Hub, {user.username || "Guest"}!</h1>
            <div>
                <Button 
                    className="mt-2 flex justify-center"
                    onClick={handleLogin}  // Redirect to login page
                >
                    Log In
                </Button>
            </div>
        </main>
    );
}
