import Link from 'next/link'

export default function Home() {
  return (
    <div className="px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to the Library Information System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse our catalog of books and manage your profile
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/books"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Browse Books
          </Link>
          <Link
            href="/profile"
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

