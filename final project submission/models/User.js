import mongoose from 'mongoose';
const FavoriteSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  preferences: { categories: [String], radiusKm: { type: Number, default: 25 } },
  favorites: [FavoriteSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
