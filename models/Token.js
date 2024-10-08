// models/Token.js
import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  user: { type: String }, // Optional, in case you want to associate tokens with users
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Token || mongoose.model('Token', TokenSchema);
