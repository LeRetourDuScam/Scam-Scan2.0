const Manga = require('../models/Manga');

exports.createManga = async (req, res) => {
    const newManga = new Manga(req.body);
    try {
        const savedManga = await newManga.save();
        res.status(201).json(savedManga);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMangas = async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 1;
        const limit = parseInt(req.query.pageSize) || 9;
        const skip = (page - 1) * limit;

        let query = Manga.find();

        // Apply filters
        query = setFilters(query, req.query);

        // Clone the query for counting
        const countQuery = query.clone();

        const totalMangas = await countQuery.countDocuments();
        const data = await query.skip(skip).limit(limit);

        res.json({
            pageNumber: page,
            count: totalMangas,
            data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setFilters = (query, filters) => {
    if (filters.variousName) {
        query = query.where('variousName').regex(new RegExp(filters.variousName, 'i'));
    }
    if (filters.slug) {
        query = query.where('slug').equals(filters.slug);
    }
    if (filters.genre) {
        const genres = filters.genre.split(',');
        query = query.where('genre').in(genres);
    }
    if (filters.status) {
        query = query.where('status').equals(filters.status);
    }
    if (filters.author) {
        query = query.where('author').regex(new RegExp(filters.author, 'i'));
    }
    if (filters.popularity) {
        query = query.where('popularity').equals(filters.popularity);
    }
    if (filters.publicationYear) {
        query = query.where('publicationYear').equals(filters.publicationYear);
    }
    if (filters.language) {
        query = query.where('language').equals(filters.language);
    }
    if (filters.rating) {
        query = query.where('rating').gte(filters.rating);
    }
    if (filters.type) {
        query = query.where('type').equals(filters.type);
    }
    console.log(filters)
    return query;
};

exports.searchMangas = async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const mangas = await Manga.find({
            name: { $regex: searchTerm, $options: 'i' } // Recherche insensible à la casse
        }).limit(10); // Limite les résultats de recherche à 10 mangas
        
        res.json(mangas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getMangaBySlug = async (req, res) => {
    try {
        const manga = await Manga.findOne({ slug: req.params.slug });
        if (!manga) {
            return res.status(404).json({ message: "Manga non trouvé" });
        }
        res.json(manga);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMangaBySlug = async (req, res) => {
    try {
        const updatedManga = await Manga.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );
        if (!updatedManga) {
            return res.status(404).json({ message: "Manga non trouvé" });
        }
        res.json(updatedManga);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMangaBySlug = async (req, res) => {
    try {
        const deletedManga = await Manga.findOneAndDelete({ slug: req.params.slug });
        if (!deletedManga) {
            return res.status(404).json({ message: "Manga non trouvé" });
        }
        res.json({ message: "Manga supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
