'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/books/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Book not found');
          } else {
            setError('Failed to load book');
          }
          return;
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error || 'Book not found'}</p>
          <Link
            href="/books"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Link
        href="/books"
        className="text-blue-600 hover:text-blue-800 underline mb-4 inline-block"
      >
        ← Back to Books
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{book.title}</h1>
        <p className="text-xl text-gray-600 mb-6">by {book.author}</p>
        
        {book.publishedYear && (
          <p className="text-gray-500 mb-6">
            <strong>Published:</strong> {book.publishedYear}
          </p>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed">{book.description}</p>
        </div>

        {book.tags && book.tags.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

