import Image from "next/image";
import Link from "next/link"; // Import Link for navigation

// Custom Components (will be created later)
import Navbar from "@/components/Navbar";
// import FeatureCard from "@/components/FeatureCard";
// import TabbedCodeBlock from "@/components/TabbedCodeBlock";
// import LogoCarousel from "@/components/LogoCarousel";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] flex flex-col items-center justify-center text-center px-4">
          {/* Placeholder for Hex-dino illustration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900 opacity-30"></div>
          <h1 className="text-5xl font-bold mb-4 z-10">
            Dev-Friendly Cloud Storage, Hulk-Strong.
          </h1>
          <p className="text-xl mb-8 z-10">
            Instant public URLs & frictionless CLI / Python uploads — minus the SDK bloat.
          </p>
          <div className="flex space-x-4 z-10">
            <Link href="mailto:invites@hulkastor.us" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full">
              Request an Invite
            </Link>
            <Link href="/docs" className="border border-white text-white font-bold py-3 px-6 rounded-full">
              Read the Docs
            </Link>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16 px-4 bg-gray-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for FeatureCard components */}
            {/* <FeatureCard
              title="⚡ One-Command Share"
              description="Ship files at Raptor speed; `hulk put,★` → link auto-copied & posted to Slack"
            />
            <FeatureCard
              title="↻ Keyless Auth Flow"
              description="Works with GitHub SSO / cloud IAM; zero keys in CI"
            />
            <FeatureCard
              title="📦 ML-Asset Ready"
              description="Multipart, resumable uploads; content-addressed caching; MD5 + SHA-256 integrity"
            /> */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2">⚡ One-Command Share</h3>
              <p>Ship files at Raptor speed; `hulk put,★` → link auto-copied & posted to Slack</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2">↻ Keyless Auth Flow</h3>
              <p>Works with GitHub SSO / cloud IAM; zero keys in CI</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2">📦 ML-Asset Ready</h3>
              <p>Multipart, resumable uploads; content-addressed caching; MD5 + SHA-256 integrity</p>
            </div>
          </div>
        </section>

        {/* Code Snippet & Testimonial Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Code Snippet Placeholder */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Code Snippet</h3>
              {/* <TabbedCodeBlock /> */}
              <pre className="bg-black p-4 rounded text-sm">
                <code>
                  Tabs: [ Bash ] [ Python ]<br />
                  $ hulk put model.ckpt<br />
                  https://hulk.st/or.us/abc123<br />
                  — copied to clipboard ✅
                </code>
              </pre>
            </div>

            {/* Testimonial Placeholder */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div>
                <p className="text-xl italic mb-4">
                  “We swapped S3 presign dance for Hulkastorus in an afternoon. Links just work.”
                </p>
                <p className="text-lg font-semibold">— ML Infra Lead, VFX Co.</p>
              </div>
              <Link href="mailto:invites@hulkastor.us" className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full self-start">
                Request Early Access
              </Link>
            </div>
          </div>
        </section>

        {/* Logo Carousel Section */}
        <section className="py-16 px-4 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
            {/* <LogoCarousel /> */}
            <div className="flex justify-around items-center overflow-hidden space-x-8">
              {/* Placeholder for logos */}
              <span className="text-gray-500 text-4xl font-bold">Hooli</span>
              <span className="text-gray-500 text-4xl font-bold">Pied Piper</span>
              <span className="text-gray-500 text-4xl font-bold">Enron</span>
              <span className="text-gray-500 text-4xl font-bold">Theranos</span>
              <span className="text-gray-500 text-4xl font-bold">...</span>
            </div>
          </div>
        </section>

        {/* Pricing Comparison Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-gray-700">Plan</th>
                    <th className="p-4 border-b border-gray-700">Free</th>
                    <th className="p-4 border-b border-gray-700">Pro</th>
                    <th className="p-4 border-b border-gray-700">Tres Commas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b border-gray-700">Monthly cost</td>
                    <td className="p-4 border-b border-gray-700">**$0** (beta)</td>
                    <td className="p-4 border-b border-gray-700">**$0** (beta)</td>
                    <td className="p-4 border-b border-gray-700">**$0** (beta)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-700">Storage cap</td>
                    <td className="p-4 border-b border-gray-700">10 GB</td>
                    <td className="p-4 border-b border-gray-700">1 TB</td>
                    <td className="p-4 border-b border-gray-700">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-700">Bandwidth</td>
                    <td className="p-4 border-b border-gray-700">50 GB/mo</td>
                    <td className="p-4 border-b border-gray-700">1 TB/mo</td>
                    <td className="p-4 border-b border-gray-700">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-700">Support</td>
                    <td className="p-4 border-b border-gray-700">Community</td>
                    <td className="p-4 border-b border-gray-700">24 h SLA</td>
                    <td className="p-4 border-b border-gray-700">Dedicated TAM</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-700">CTA</td>
                    <td className="p-4 border-b border-gray-700">
                      <Link href="mailto:invites@hulkastor.us" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm">
                        Get Free
                      </Link>
                    </td>
                    <td className="p-4 border-b border-gray-700">
                      <Link href="mailto:invites@hulkastor.us" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm">
                        Join Waitlist
                      </Link>
                    </td>
                    <td className="p-4 border-b border-gray-700">
                      <Link href="mailto:invites@hulkastor.us" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full text-sm">
                        Contact Sales
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 text-center text-gray-400">
        <p>© 2025 Hulkastorus • <Link href="/privacy" className="hover:underline">Privacy</Link> • <Link href="/terms" className="hover:underline">Terms</Link> • <Link href="https://twitter.com/hulkastorus" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</Link></p>
      </footer>
    </div>
  );
}