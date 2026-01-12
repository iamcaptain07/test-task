import Link from 'next/link';

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No books found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/books/${book.id}`}
          className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          {book.publishedYear && (
            <p className="text-sm text-gray-500 mb-3">
              Published: {book.publishedYear}
            </p>
          )}
          <p className="text-gray-700 line-clamp-3 mb-4">
            {book.description}
          </p>
          {book.tags && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

