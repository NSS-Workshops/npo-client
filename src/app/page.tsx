import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Not sure we will use this home page for anything */}
      <div className="flex flex-col items-center justify-evenly">
        <p>Whoops! Were you looking for 
          <Link className="text-blue-300 hover:text-blue-400" href="/project-list"> projects </Link>
           to work on?</p>
      </div>
    </main>
  );
}
