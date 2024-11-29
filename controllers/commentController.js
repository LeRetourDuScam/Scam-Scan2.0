const Comment = require('../models/Comment')
// Get all comments for a specific manga
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ mangaSlug: req.params.mangaSlug });
        console.log(comments)
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Post a new comment
exports.postComment = async (req, res) => {
    console.log(req.body)
    const comment = new Comment({
        mangaSlug: req.body.mangaSlug,
        username: req.body.username,
        content: req.body.content
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Post a reply to a comment
exports.postReply = async (req, res) => {
    try {
        console.log(req.body)
        const parentComment = await Comment.findById(req.body.parentId);
        if (!parentComment) {
            return res.status(404).json({ message: 'Parent comment not found' });
        }

        const reply = new Comment({
            mangaSlug: parentComment.mangaSlug,
            username: req.body.username,
            content: req.body.content,
            parentId: req.body.parentId
        });

        const newReply = await reply.save();
        res.status(201).json(newReply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};