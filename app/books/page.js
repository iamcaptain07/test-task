'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookList from '@/components/BookList';
import SearchInput from '@/components/SearchInput';

function BooksContent() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const search = searchParams.get('search') || '';
        const params = search ? `?search=${encodeURIComponent(search)}` : '';
        const response = await fetch(`/api/books${params}`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchParams]);

  return (
    <>
      <SearchInput />
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading books...</p>
        </div>
      ) : (
        <BookList books={books} />
      )}
    </>
  );
}

export default function BooksPage() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Book Catalog</h1>
      <Suspense fallback={
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      }>
        <BooksContent />
      </Suspense>
    </div>
  );
}
