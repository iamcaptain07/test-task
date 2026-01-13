import connectDB from './db';
import Book from '@/models/Book';

export async function getBooks() {
  await connectDB();
  const books = await Book.find({}).lean();
  return books.map(book => {
    const { _id, __v, ...bookData } = book;
    return bookData;
  });
}

export async function getBookById(id) {
  await connectDB();
  const book = await Book.findOne({ id: parseInt(id) }).lean();
  
  if (!book) {
    return null;
  }
  
  const { _id, __v, ...bookData } = book;
  return bookData;
}

export async function searchBooks(query) {
  await connectDB();
  
  if (!query || query.trim() === '') {
    const books = await Book.find({}).lean();
    return books.map(book => {
      const { _id, __v, ...bookData } = book;
      return bookData;
    });
  }

  const searchTerm = query.trim();
  
  // Use MongoDB regex for case-insensitive search
  const books = await Book.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { tags: { $regex: searchTerm, $options: 'i' } }
    ]
  }).lean();
  
  return books.map(book => {
    const { _id, __v, ...bookData } = book;
    return bookData;
  });
}
