import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  publishedYear: { type: Number }
}, {
  timestamps: false,
  toJSON: { 
    virtuals: false, 
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);

export default Book;

