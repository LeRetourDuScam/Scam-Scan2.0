const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [this] // Auto-référence pour permettre des réponses dans les réponses
  });
  
  const commentSchema = new mongoose.Schema({
    mangaSlug: { type: String, ref: 'Manga', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [replySchema]
  });
  
module.exports = mongoose.model('Comment', commentSchema);