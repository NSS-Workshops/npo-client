'use client'

import { Button } from "../../ui/button"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    return (
        <main>
            <h1>Login</h1>
            <div>
                <Button 
                    className="mt-2"
                    
                >Login with Github</Button>
            </div>
        </main>
    )
}

