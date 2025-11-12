const User = require('../models/User');
const Event = require('../models/Event');

exports.getFavorites = async (req, res) => {
  const favIds = (req.user.favorites || []).map(f => f.eventId);
  const events = await Event.find({ eventId: { $in: favIds } });
  res.json({ favorites: req.user.favorites, events });
};

exports.addFavorite = async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) return res.status(400).json({ error: 'eventId required' });
  const exists = req.user.favorites.find(f => f.eventId === eventId);
  if (!exists) req.user.favorites.push({ eventId });
  await req.user.save();
  res.json({ message: 'Event added to favorites' });
};

exports.removeFavorite = async (req, res) => {
  const { eventId } = req.params;
  req.user.favorites = req.user.favorites.filter(f => f.eventId !== eventId);
  await req.user.save();
  res.json({ message: 'Event removed from favorites' });
};
