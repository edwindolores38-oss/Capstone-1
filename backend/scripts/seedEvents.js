/**
 * Seed events into MongoDB
 * Usage: npm run seed
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Event = require('../models/Event');

dotenv.config();

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const dataPath = path.join(__dirname, '..', 'seed', 'events.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    const events = JSON.parse(raw);
    console.log('Upserting', events.length, 'events...');
    const ops = events.map(e => ({
      updateOne: { filter: { eventId: e.eventId }, update: { $set: e }, upsert: true }
    }));
    const result = await Event.bulkWrite(ops);
    console.log('Done:', result.nUpserted, 'upserted');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
