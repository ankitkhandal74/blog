// models/Ad.js
import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true }, // e.g., AD_1, AD_2
  adCode: { type: String, required: true }, // Google Ad script or iframe code
  description: { type: String }, // Optional ad description
});

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);
