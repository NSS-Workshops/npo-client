import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';

export default function SideNav() {
    return (
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-white p-4 md:h-40"
          href="/"
        >
          <div className="w-32 text-blue-900 md:w-40">
            Logo Here
          </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 text-blue-900 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">
              {/* Sign Out Icon */}
              <div className="hidden md:block ">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    );
  }