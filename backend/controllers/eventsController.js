const Event = require('../models/Event');

exports.list = async (req, res) => {
  try {
    const { q, category, city, lat, lng, radiusKm = 25, start, end, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') },
        { 'venue.city': new RegExp(q, 'i') }
      ];
    }
    if (category) filter.category = category;
    if (city) filter['venue.city'] = new RegExp(`^${city}$`, 'i');
    if (start || end) filter.startDate = {};
    if (start) filter.startDate.$gte = new Date(start);
    if (end) filter.startDate.$lte = new Date(end);

    if (lat && lng) {
      const maxDistance = (parseFloat(radiusKm) || 25) * 1000;
      filter['venue.location'] = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: maxDistance
        }
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const events = await Event.find(filter).sort({ startDate: 1 }).skip(skip).limit(parseInt(limit));
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.detail = async (req, res) => {
  try {
    const { eventId } = req.params;
    const ev = await Event.findOne({ eventId });
    if (!ev) return res.status(404).json({ error: 'Event not found' });
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.upsertMany = async (req, res) => {
  try {
    const events = req.body.events || [];
    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'events array required' });
    }
    const bulkOps = events.map(e => ({
      updateOne: {
        filter: { eventId: e.eventId },
        update: { $set: e },
        upsert: true
      }
    }));
    const result = await Event.bulkWrite(bulkOps);
    res.json({ ok: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
