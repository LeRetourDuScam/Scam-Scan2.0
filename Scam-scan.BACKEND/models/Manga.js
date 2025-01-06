const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
    name: String,
    variousName: String,
    slug: String,
    description: String,
    image: String,
    genre: String,
    status: String,
    author: String,
    popularity: Number,
    publicationYear: Number,
    language: String,
    rating: Number,
    type: String,
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
});

module.exports = mongoose.model('Manga', MangaSchema, 'mangas');
