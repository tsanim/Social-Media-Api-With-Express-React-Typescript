import express from 'express';

const router = express.Router();
import feedControllers from '../controllers/feedControllers';
import storage from '../config/gridFsStorage';
import multer from 'multer';
const upload = multer({ storage });

import isAuth from '../middlewares/isAuth';

//get image from db route
router.get('/image/:imageId', feedControllers.getImage);

//posts routes
router.get('/posts/:userId', isAuth, feedControllers.getAllUserPosts);
router.get('/posts', isAuth, feedControllers.getAllUserSubsPosts);
router.get('/searchPosts', isAuth,  feedControllers.searchPosts);
router.get('/posts/likes/:postId', feedControllers.getPostLikes);
router.post('/posts/create', isAuth, upload.single('postImg'), feedControllers.createPost);
router.put('/posts/like/:postId', isAuth, feedControllers.likePost);
router.put('/posts/dislike/:postId', isAuth, feedControllers.dislikePost);
router.put('/posts/edit/:postId', isAuth, feedControllers.editPost);
router.delete('/posts/:postId', isAuth, feedControllers.deletePost);

//comments routes
router.post('/comments/create', isAuth, feedControllers.createComment);
router.put('/comments/like/:commentId', isAuth, feedControllers.likeComment);
router.put('/comments/dislike/:commentId', isAuth, feedControllers.dislikeComment);
router.get('/comments/likes/:commentId', feedControllers.getCommentLikes);
router.delete('/comments/delete/:commentId', isAuth, feedControllers.deleteComment);

export default  router;
