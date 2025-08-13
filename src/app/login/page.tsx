import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Top-left logo and Back to Home link */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        {/* Placeholder for hex-dino logo */}
        {/* <Image src="/hex-dino.svg" alt="Hulkastorus Logo" width={32} height={32} className="invert" /> */}
        <span className="text-xl font-bold">Hulkastorus</span>
      </div>
      <div className="absolute top-4 right-4">
        <Link href="/" className="text-gray-400 hover:text-white">
          ← Back to Home
        </Link>
      </div>

      {/* Login Panel */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome back, beast.</h1>
        <p className="text-gray-400 mb-6">Log in to crush some bytes.</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            🦖 Log In
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link href="/reset-password" className="text-blue-400 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-6 text-gray-400">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Sign up →
          </Link>
        </div>
      </div>

      {/* Footer Strip */}
      <footer className="absolute bottom-4 text-gray-400 text-sm">
        © 2025 Hulkastorus | <Link href="/terms" className="hover:underline">ToS</Link> | <Link href="/gdpr" className="hover:underline">GDPR</Link>
      </footer>
    </div>
  );
}