import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SEO Proposal Generator
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Generate professional SEO proposals in minutes with AI
        </p>
        <Link 
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
        >
          Get Started →
        </Link>
      </div>
    </main>
  )
}
