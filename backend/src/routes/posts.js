const express = require('express')
const router = express.Router()

const postsCtrl = require('../controllers/posts')
const commentsCtrl = require('../controllers/comments')
const likesCtrl = require('../controllers/likes')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, postsCtrl.createPost)
router.get('/:id', auth, postsCtrl.getOnePost)
router.get('/', auth, postsCtrl.getAllPosts)
router.put('/:id', auth, multer, postsCtrl.updatePost)
router.delete('/:id', auth, postsCtrl.deletePost)

router.post('/:postId/comments', auth, commentsCtrl.createComment)
router.get('/:postId/comments/:id', auth, commentsCtrl.getOneComment)
router.get('/:postId/comments/', auth, commentsCtrl.getAllComments)
router.put('/:postId/comments/:id', auth, commentsCtrl.updateComment)
router.delete('/:postId/comments/:id', auth, commentsCtrl.deleteComment)

router.post('/:postId/likes', auth, likesCtrl.likePost)
router.get('/:postId/like', auth, likesCtrl.getLikeOnPost)
router.get('/:postId/likes', auth, likesCtrl.getAllLikesFromPost)

module.exports = router
