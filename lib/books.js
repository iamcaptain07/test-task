import { getBooksCollection } from './db';

export async function getBooks() {
  const booksCollection = await getBooksCollection();
  const books = await booksCollection.find({}).toArray();
  
  // Remove MongoDB _id from each book
  return books.map(book => {
    const { _id, ...bookData } = book;
    return bookData;
  });
}

export async function getBookById(id) {
  const booksCollection = await getBooksCollection();
  const book = await booksCollection.findOne({ id: parseInt(id) });
  
  if (!book) {
    return null;
  }
  
  // Remove MongoDB _id
  const { _id, ...bookData } = book;
  return bookData;
}

export async function searchBooks(query) {
  const booksCollection = await getBooksCollection();
  
  if (!query || query.trim() === '') {
    const books = await booksCollection.find({}).toArray();
    return books.map(book => {
      const { _id, ...bookData } = book;
      return bookData;
    });
  }

  const searchTerm = query.trim();
  
  // Use MongoDB regex for case-insensitive search
  const books = await booksCollection.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { tags: { $regex: searchTerm, $options: 'i' } }
    ]
  }).toArray();
  
  return books.map(book => {
    const { _id, ...bookData } = book;
    return bookData;
  });
}

