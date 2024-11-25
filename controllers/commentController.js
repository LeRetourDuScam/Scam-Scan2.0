const Comment = require('../models/Comment')
// Get all comments for a specific manga
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ mangaSlug: req.params.mangaSlug }).populate('userId', 'username');
        console.log(comments)
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Post a new comment
exports.postComment = async (req, res) => {
    const comment = new Comment({
        mangaSlug: req.body.mangaSlug,
        userId: req.body.userId,
        content: req.body.content
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.replyToComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const reply = {
            userId,
            content,
            createdAt: new Date(),
            replies: []
        };

        // Ajoute la réponse au commentaire principal
        comment.replies.push(reply);
        await comment.save();

        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Répondre à une réponse existante
exports.replyToReply = async (req, res) => {
    try {
        const { commentId, replyId } = req.params;
        const { userId, content } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const reply = {
            userId,
            content,
            createdAt: new Date(),
            replies: []
        };

        // Trouve la réponse parent pour y ajouter une sous-réponse
        const parentReply = findReply(comment.replies, replyId);
        if (!parentReply) {
            return res.status(404).json({ message: 'Parent reply not found' });
        }

        parentReply.replies.push(reply);
        await comment.save();

        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fonction utilitaire pour trouver une réponse imbriquée
function findReply(replies, replyId) {
    for (const reply of replies) {
        if (reply._id.toString() === replyId) {
            return reply;
        }
        const nestedReply = findReply(reply.replies, replyId);
        if (nestedReply) {
            return nestedReply;
        }
    }
}