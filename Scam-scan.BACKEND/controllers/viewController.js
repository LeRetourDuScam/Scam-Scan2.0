const View = require('../models/view');

// Ajouter une vue
exports.addView = async (req, res) => {
    const { Slug } = req.body;
    try {
        let view = await View.findOne({ Slug });
        if (!view) {
            view = new View({ Slug });
        }
        view.views += 1;
        await view.save();
        res.json(view);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une vue par Slug
exports.getViewBySlug = async (req, res) => {
    const { Slug } = req.params;
    try {
        const view = await View.findOne({ Slug });
        if (!view) {
            return res.status(404).json({ message: "Vue non trouvée" });
        }
        res.json(view);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

