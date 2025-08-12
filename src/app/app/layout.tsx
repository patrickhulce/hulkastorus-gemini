import Link from "next/link";

// Custom Components (will be created later)
// import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col">
        <div className="mb-8">
          {/* Logo */}
          <Link href="/app/dashboard" className="text-2xl font-bold">Hulkastorus</Link>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-2">
              <Link href="/app/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link href="/app/browse" className="block p-2 rounded hover:bg-gray-700">File Manager</Link>
            </li>
            <li className="mb-2">
              <Link href="/app/settings" className="block p-2 rounded hover:bg-gray-700">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-grow p-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-4 px-4 bg-gray-800 text-center text-gray-400">
          <p>© 2025 Hulkastorus • Privacy • Terms</p>
        </footer>
      </div>
    </div>
  );
}
