const Manga = require('../models/Manga');

// CREATE : Ajouter un nouveau manga
exports.createManga = async (req, res) => {
    const newManga = new Manga(req.body);
    try {
        const savedManga = await newManga.save();
        res.status(201).json(savedManga);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ : Obtenir tous les mangas avec pagination
exports.getMangas = async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber);   
        const limit = parseInt(req.query.pageSize); 

        const skip = (page - 1) * limit; // Calcule le nombre d'éléments à sauter

        // Trouver les mangas avec pagination
        const data = await Manga.find().skip(skip).limit(limit);
        const totalMangas = await Manga.countDocuments(); // Compte le total des mangas

        res.json({
            pageNumber:page,
            count: totalMangas,
            data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// SEARCH : Rechercher des mangas par nom
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


// READ : Obtenir un manga par son slug
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

// UPDATE : Mettre à jour un manga par le slug
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

// DELETE : Supprimer un manga par le slug
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
