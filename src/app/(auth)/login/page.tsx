'use client'

import { Button } from "../../ui/button"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    return (
        <main>
            <h1 className="flex justify-center text-2xl">Welcome to Nashville NPO Hub!</h1>
            <div>
                <Button 
                    className="mt-2 flex justify-center"
                    
                >Log In</Button>
            </div>
        </main>
    )
}

