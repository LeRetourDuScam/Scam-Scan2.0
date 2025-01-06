const mongoose = require('mongoose');
  
  const commentSchema = new mongoose.Schema({
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, 
    mangaSlug: { type: String, ref: 'Manga', required: true },
    username: { type: String,required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
module.exports = mongoose.model('Comment', commentSchema);