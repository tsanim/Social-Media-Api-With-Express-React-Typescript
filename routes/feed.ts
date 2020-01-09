import express from 'express';

const router = express.Router();
import feedControllers from '../controllers/feedControllers';

import isAuth from '../middlewares/isAuth';

//get image from db route
router.get('/image/:imageId', feedControllers.getImage);

//comments routes
router.post('/comments/create', isAuth, feedControllers.createComment);
router.put('/comments/like/:commentId', isAuth, feedControllers.likeComment);
router.put('/comments/dislike/:commentId', isAuth, feedControllers.dislikeComment);
router.get('/comments/likes/:commentId', feedControllers.getCommentLikes);
router.delete('/comments/delete/:commentId', isAuth, feedControllers.deleteComment);

export default  router;
