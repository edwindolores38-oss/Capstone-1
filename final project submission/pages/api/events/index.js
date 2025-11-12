import dbConnect from '../../../lib/db';
import Event from '../../../models/Event';

export default async function handler(req, res){
  await dbConnect();
  if(req.method === 'GET'){
    const { q, category, city, lat, lng, radiusKm = 25, start, end, page = 1, limit = 12 } = req.query;
    const filter = {};
    if(q) filter.$text = { $search: q };
    if(category) filter.category = category;
    if(city) filter['venue.city'] = new RegExp(`^${city}$`, 'i');
    if(start || end){ filter.startDate = {}; if(start) filter.startDate.$gte = new Date(start); if(end) filter.startDate.$lte = new Date(end); }
    if(lat && lng){
      const maxDistance = (parseFloat(radiusKm)||25) * 1000;
      filter['venue.location'] = { $near: { $geometry: { type:'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, $maxDistance: maxDistance } };
    }
    const skip = (parseInt(page)-1) * parseInt(limit);
    const events = await Event.find(filter).sort({ startDate: 1 }).skip(skip).limit(parseInt(limit));
    return res.json(events);
  }
  if(req.method === 'POST'){
    // Simple create endpoint for organizers/admins in future; for now allow create with minimal fields
    const body = req.body || {};
    if(!body.eventId || !body.title) return res.status(400).json({ error: 'eventId and title required' });
    const created = await Event.findOneAndUpdate({ eventId: body.eventId }, { $set: body }, { upsert: true, new: true });
    return res.status(201).json(created);
  }
  res.status(405).end();
}
