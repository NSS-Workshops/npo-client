'use client'

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    return (
        <main>
            <h1 className="flex flex-col items-center justify-evenly p-24 text-3xl">Project List</h1>
            <div className="flex flex-row flex-wrap items-start justify-evenly min-w-full min-h-screen border border-solid border-gray-400">
                
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
                <div className="m-10 border border-dotted p-8 min-w-max min-h-full">
                    <h1>Project 1</h1>
                    <p>Description of project 1, it is a great project etc etc</p>
                </div>
            </div>
        </main>
    )
} 

/* export default async function Page() {
    return (
      <main>
        <h1 className={`mb-4 text-xl md:text-2xl`}>
          Project List
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardsSkeleton/>}>
            <CardWrapper/>
          </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<RevenueChartSkeleton/>}>
            <RevenueChart/>
          </Suspense>
          <Suspense fallback={<LatestInvoicesSkeleton/>}>
            <LatestInvoices />
          </Suspense>
        </div>
      </main>
    );
  } */

