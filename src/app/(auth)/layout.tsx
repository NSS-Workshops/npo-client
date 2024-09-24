export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col items-center justify-centermd:flex-row md:overflow-hidden ">
        <div className="p-6 m-40 md:overflow-y-auto md:p-12 border-solid border-2 rounded-xl">{children}</div>
      </div>
    );
  }