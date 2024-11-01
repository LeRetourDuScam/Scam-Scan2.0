const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    image: String,
    chapters: [
        {
            name: String,
            slug: String,
            updated_at: Date,
            images: [
                { path: String }
            ]
        }
    ],
    updated_at: Date,
    created_at: Date,
    variousName: String
});

module.exports = mongoose.model('Manga', MangaSchema, 'mangas');
