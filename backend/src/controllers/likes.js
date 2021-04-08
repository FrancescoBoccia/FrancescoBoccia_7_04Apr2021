const db = require("../models");
const { Likes } = db.sequelize.models;

exports.likePost = async (req, res, next) => {
  try {
    const alreadyLiked = await Likes.findOne({
      where: { userId: req.user.id, postId: req.params.postId },
    });

    if (alreadyLiked) {
      await alreadyLiked.destroy();
      res.status(200).json({ like: false });
    } else {
      await Likes.create({ userId: req.user.id, postId: req.params.postId });
      res.status(201).json({ like: true });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getLikeOnPost = async (req, res, next) => {
  try {
    const alreadyLiked = await Likes.findOne({
      where: { userId: req.user.id, postId: req.params.postId },
    });
    res.status(200).json({ like: alreadyLiked ? true : false });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllLikesFromPost = async (req, res, next) => {
  try {
    const allLikes = await Likes.findAll({
      where: { postId: req.params.postId },
      include: db.User,
    });
    res.status(200).json({ allLikes });
  } catch (error) {
    res.status(400).json({ error });
  }
};
