import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Top-left logo */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        {/* Placeholder for hex-dino logo */}
        {/* <Image src="/hex-dino.svg" alt="Hulkastorus Logo" width={32} height={32} className="invert" /> */}
        <span className="text-xl font-bold">Hulkastorus</span>
      </div>
      <div className="absolute top-4 right-4">
        <Link href="/" className="text-gray-400 hover:text-white">
          ← Back Home
        </Link>
      </div>

      {/* Sign-up Panel */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Join the private beta.</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="firstName" className="sr-only">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="inviteCode" className="sr-only">Invite Code</label>
            <input
              type="text"
              id="inviteCode"
              name="inviteCode"
              placeholder="Invite Code"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            🦖 Create Account
          </button>
        </form>

        <div className="mt-6 text-gray-400">
          Already registered?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log in →
          </Link>
        </div>
      </div>
    </div>
  );
}