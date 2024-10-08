// /models/Author.js
import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // URL to the author's image
    required: true,
  },
});

export default mongoose.models.Author || mongoose.model('Author', AuthorSchema);
