const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    Slug: { type: String, unique: true },
    views: { type: Number, default: 0 }
});

module.exports = mongoose.model('View', viewSchema);