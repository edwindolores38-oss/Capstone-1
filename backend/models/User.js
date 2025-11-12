const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  eventId: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  preferences: {
    categories: [{ type: String }],
    radiusKm: { type: Number, default: 25 }
  },
  favorites: [FavoriteSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
