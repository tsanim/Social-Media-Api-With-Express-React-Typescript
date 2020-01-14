import express from "express";
import isAuth from "../middlewares/isAuth";
import logger from "../logger/logger";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import RequestCustom from "../interfaces/RequestCustom.interface";
import Controller from "../interfaces/Controller.interface";

export default class CommentsController implements Controller {
    public path = '/feed';
    public router = express.Router();

    constructor() {
        this.intitializeRoutes();
    }

    private intitializeRoutes() {
        this.router.post('/comments/create', isAuth, this.createComment);
        this.router.put('/comments/like/:commentId', isAuth, this.likeComment);
        this.router.put('/comments/dislike/:commentId', isAuth, this.dislikeComment);
        this.router.get('/comments/likes/:commentId', this.getCommentLikes);
        this.router.delete('/comments/delete/:commentId', isAuth, this.deleteComment);
    }

    private async createComment(req: RequestCustom, res: express.Response, next: express.NextFunction) {
        try {
            //init comment data fromr req body
            const { text, postId } = req.body;

            logger.log('debug', `Comment post request body post id: ${postId}, comment text: ${text}`);

            //if text is empty string then return error
            if (text === '' || !text) {
                let error = new Error('You can not make comment without text!')
                error.statusCode = 500;

                throw error;
            }

            //find user by req user id prop from decoded token
            const user = await User.findById(req.userId);

            //find post by id
            let post = await Post.findById(postId);

            //create comment
            let comment = await Comment.create({ text, creator: req.userId, post: postId });
            comment = await comment.populate('creator').execPopulate();

            user.comments.push(comment._id);
            user.save();

            //update post's comments array like push new comment id
            post.comments.push(comment._id);

            post = await post.populate('creator').populate('comments').populate('likes').populate({
                path: 'comments',
                populate: {
                    path: 'creator',
                }
            }).execPopulate();

            post.save();

            logger.log('info', 'Comment created succesfully!');

            res.status(201).json({ message: 'Comment created succesfully!', post });
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async likeComment(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get comment id from req params
            const { commentId } = req.params;

            logger.log('debug', `Like comment request params comment id: ${commentId}`);

            //find comment by id 
            let comment = await Comment.findById(commentId);

            //find post by comment post 
            let post = await Post.findById(comment.post).populate('creator').populate('likes').populate('comments').populate({
                path: 'comments',
                populate: {
                    path: 'creator'
                }
            });

            //if comment's likes array does not contain user id - then push user id to comment's likes array
            if (comment.likes.indexOf(req.userId) === -1) {
                comment.likes.push(req.userId);
            }

            comment = await comment.populate('creator').execPopulate();

            //get index of liked comment from the post
            const indexOfLikedCom = post.comments.findIndex((c) => c._id.toString() === comment.id)

            //update post comments as change old unliked comment with new - liked
            post.comments[indexOfLikedCom] = comment;
            comment.save();
            post.save();

            logger.log('info', 'Comment is liked!');

            res.status(200).json({ message: 'Comment liked!', post });
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async dislikeComment(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get comment id from req params
            const { commentId } = req.params;

            logger.log('debug', `Dislike comment request params comment id: ${commentId}`);

            //find comment by id 
            let comment = await Comment.findById(commentId);

            //find post by comment post 
            let post = await Post.findById(comment.post)
                .populate('creator')
                .populate('likes')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'creator'
                    }
                });

            //if comment's likes array contain user id - then filter comment's likes array
            if (comment.likes.indexOf(req.userId) >= 0) {
                comment.likes = comment.likes.filter(like => like.toString() !== req.userId);
            }

            comment = await comment.populate('creator').execPopulate();

            //get index of disliked comment 
            const indexOfDislikedCom = post.comments.findIndex((c) => c._id.toString() === comment.id)

            //update post comments as change old unliked comment with new - liked
            post.comments[indexOfDislikedCom] = comment;

            comment.save();
            post.save();

            logger.log('info', 'Comment is disliked!');

            res.status(200).json({ message: 'Comment disliked!', post });
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async getCommentLikes(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { commentId } = req.params;

            logger.log('debug', `Post's likes request params comment id: ${commentId}`);

            const comment = await Comment.findById(commentId).populate('likes');

            logger.log('info', 'Comment likers fetched succesfully!');
            res.status(201).json({ message: 'Comment likers fetched succesfully!', likes: comment.likes });
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private deleteComment(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get comment id from req params
            const { commentId } = req.params;

            logger.log('debug', `Request paramas to comment delete: comment id ${commentId}!`);
            
            Comment.findByIdAndDelete(commentId, async (err: any, comment) => {
                if (err) {
                    if (!err.statuCode) {
                        err.statuCode = 500;
                    }

                    next(err);
                }

                //find user by comment creator
                let user = await User.findById(comment.creator)

                //find commented post by comment post
                let commentedPost = await Post.findById(comment.post);

                //filter user comments
                const newUserComments = user.comments.filter(userC => userC._id.toString() !== comment.id);
                //filter post comments
                const newPostComments = commentedPost.comments.filter(postC => postC._id.toString() !== comment.id);

                user.comments = newUserComments;
                user.save();

                //update post comments
                commentedPost.comments = newPostComments;
                commentedPost = await commentedPost
                    .populate('creator')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'creator',
                        }
                    })
                    .populate('likes')
                    .execPopulate();

                commentedPost.save();

                    
                logger.log('info', 'Comment deleted!');

                res.status(200).json({ message: 'Comment deleted!', post: commentedPost });
            })
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }
}