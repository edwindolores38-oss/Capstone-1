const mongoose = require('mongoose');
const { Schema } = mongoose;

const VenueSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  postalCode: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  }
}, { _id: false });

const EventSchema = new Schema({
  eventId: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  description: String,
  category: { type: String, index: true },
  startDate: { type: Date, index: true },
  endDate: Date,
  venue: VenueSchema,
  price: { min: Number, max: Number, currency: String },
  url: String,
  image: String,
  source: String,
  raw: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
