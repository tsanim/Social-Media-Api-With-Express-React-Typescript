import express from 'express';
import logger from '../logger/logger';
import isAuth from '../middlewares/isAuth';
import Post from '../models/Post';
import User from '../models/User';
import multer from 'multer';
import validatePost from '../utils/validatePost';
import mongoose, { Connection } from 'mongoose';
import Comment from '../models/Comment';
import IPost from '../interfaces/models/Post.interface';
const conn: Connection = mongoose.connection;

class PostsController {
    public path = '/feed';
    public router = express.Router();
    private upload = multer({ storage: this.storage });

    constructor(public storage: any) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/searchPosts', isAuth, this.searchPosts);
        this.router.get('/posts/:userId', isAuth, this.getAllUserPosts);
        this.router.get('/posts', isAuth, this.getAllUserSubsPosts);
        this.router.get('/posts/likes/:postId', isAuth, this.getPostLikes);
        this.router.post('/posts/create', isAuth, this.upload.single('postImg'), this.createPost);
        this.router.put('/posts/like/:postId', isAuth, this.likePost);
        this.router.put('/posts/dislike/:postId', isAuth, this.dislikePost);
        this.router.put('/posts/edit/:postId', isAuth, this.editPost);
        this.router.delete('/posts/:postId', isAuth, this.deletePost);
    }

    private async deletePost(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get post id from req params prop
            const { postId } = req.params;

            Post.findByIdAndDelete(postId, async (err, post) => {
                if (err) {
                    if (!err.statuCode) {
                        err.statuCode = 500;
                    }

                    next(err);
                }

                //find user that is creator to deleted post
                const user = await User.findById(post.creator).populate('posts')
                    .populate('comments')
                    .populate({
                        path: 'posts',
                        populate: {
                            path: 'creator'
                        }
                    })
                    .populate({
                        path: 'posts',
                        populate: {
                            path: 'likes'
                        }
                    }).populate({
                        path: 'posts',
                        populate: {
                            path: 'comments',
                            populate: {
                                path: 'creator'
                            }
                        }
                    });

                //delete all comments on deleted post
                await Comment.deleteMany({ post: post._id });

                logger.log('debug', `All posts' comments with id: ${post._id} is deleted`);

                //filter user posts
                const newUserPosts = user.posts.filter(userP => userP._id.toString() !== post.id);

                //update user posts
                user.posts = newUserPosts;
                user.save();

                //if post has a image - then remove it from db (for collecting more space)
                if (post.imageId) {
                    const bucket = new mongoose.mongo.GridFSBucket(conn.db);

                    let id = new mongoose.mongo.ObjectID(post.imageId);

                    bucket.delete(id);
                }

                logger.log('info', `Post is deleted!`);

                res.status(200).json({ message: 'Post is deleted!', posts: user.posts, user });
            })
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async editPost(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //init req body obj
            const reqBody = req.body;

            logger.log('debug', `Post editted body.`);

            //get post id from req params prop
            const { postId } = req.params;

            logger.log('debug', `Post editted request paramas postId: ${postId}`);

            //update post with req body obj 
            Post.findByIdAndUpdate(postId, reqBody, { new: true, useFindAndModify: false }, (err: any, postDoc: any) => {
                if (err) {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }

                    next(err);
                }

                const post = postDoc._doc ? postDoc._doc : postDoc;

                logger.log('info', `Post with id: ${post._id} is succesfully updated!`);

                res.status(202).json({ message: 'Post succesfully updated!', post });
            }).populate('creator')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'creator'
                    }
                })
                .populate('likes');
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async dislikePost(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get post id from req params
            const { postId } = req.params;

            logger.log('debug', `Dislike post request params post id: ${postId}!`);

            //find post by id
            let post = await Post.findById(postId);

            //if post's likes array contain user id - then filter post's likes array
            if (post.likes.indexOf(req.userId) >= 0) {
                post.likes = post.likes.filter(like => like.toString() !== req.userId);
            }

            post = await post.populate('creator').populate('comments').populate({
                path: 'comments',
                populate: {
                    path: 'creator'
                }
            })
                .populate('likes')
                .execPopulate();

            post.save();

            logger.log('info', 'Post is unliked!');

            res.status(200).json({ message: 'Post unliked!', post });
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async likePost(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get post id from req params
            const { postId } = req.params;

            logger.log('debug', `List post with request params post id: ${postId}!`);

            //find post by id
            let post = await Post.findById(postId);

            //if post's likes array does not contain user id - then push user id to post likes
            if (post.likes.indexOf(req.userId) === -1) {
                post.likes.push(req.userId);
            }

            //populate creator, comments' creator, likes
            post = await post.populate('creator').populate({
                path: 'comments',
                populate: {
                    path: 'creator'
                }
            })
                .populate('likes')
                .execPopulate();

            post.save();

            logger.log('info', 'Post is liked!');

            res.status(200).json({ message: 'Post liked!', post });
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async createPost(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (validatePost(req, res)) {
            try {
                //init req body
                const reqBody = req.body;

                logger.log('debug', `Post created with requests body.`);

                //assign req body object with object that contain post creator to new post object
                const newPost: IPost = Object.assign({}, reqBody, { creator: req.userId });

                //if there is no text or file - send message to user that he can not upload post with empty data
                if (reqBody.text && reqBody.text === '' && !req.file) {
                    let error = new Error('You can not upload post with empty text or no image!')
                    error.statusCode = 500;

                    logger.log('error', `You can not upload post with empty text or no image!.`);

                    throw error;
                }

                //if there is req file add image id prop to new post object 
                if (req.file) {
                    logger.log('debug', `Post is created with image - imageId: ${req.file.id.toString()}`);

                    newPost.imageId = req.file.id.toString();
                }

                //create post
                let post = await Post.create(newPost);
                //populate creator and likes
                post = await post.populate('creator').populate('likes').execPopulate();
                //find user that are creator to push new post to his posts array
                let user = await User.findById(post.creator);

                user.posts.push(post._id);
                user.save();

                logger.log('info', `Post (Id: ${post._id}, creatorId: ${post.creator}) is created!`);

                res.status(201).json({ message: 'Post is created succesfully!', post });
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            }
        }
    }

    private async getPostLikes(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { postId } = req.params;

            logger.log('debug', `Post's likes request params with post id: ${postId}`);

            const post = await Post.findById(postId).populate('likes');

            logger.log('info', 'Post likers fetched succesfully!');


            res.status(201).json({ message: 'Post likers fetched succesfully!', likes: post.likes });
        } catch (error) {
            if (!error.statuCode) {
                error.statuCode = 500;
            }

            next(error);
        }
    }

    private async searchPosts(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let { searchText } = req.query;

            logger.log('debug', `Search post request query: Search text - ${searchText}`);

            let toLowerCaseSearchText = searchText.toLowerCase();

            const posts = await Post.find({})
                .populate('creator')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'creator',
                    }
                })
                .populate('likes');

            let filteredPosts = posts.filter(p => p.text.toLowerCase().startsWith(toLowerCaseSearchText) || p.text.toLowerCase().includes(toLowerCaseSearchText));

            logger.log('info', `Posts with search text ${searchText} are found`);

            res.status(200).json({ message: 'Posts are found!', foundPosts: filteredPosts });
        } catch (error) {
            next(error);
        }
    }

    private async getAllUserPosts(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //find user by req user id prop from decoded token
            const user = await User.findById(req.userId);

            logger.log('debug', `Found user with Id: ${user._id}`);

            //find all posts that are with user id creator and populate their prop to user can get acces to their props from db
            const posts = await Post.find({ creator: { "$in": user._id } })
                .populate('creator')
                .populate('comments')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'creator',
                    }
                })
                .populate('likes');

            logger.log('info', `Posts with creator user with Id: ${user._id} are found`);

            res.status(200).json({ message: 'Posts succesfully found!', posts });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        }
    }

    private async getAllUserSubsPosts(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //find user by req user id prop from decoded token
            const user = await User.findById(req.userId);

            logger.log('debug', `Found user with Id: ${user._id}`);

            //find all posts that are with creators which are user subscriptions list and populate their props
            const posts = await Post.find({ creator: { "$in": user.subscriptions } })
                .populate('creator')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'creator',
                    }
                })
                .populate('likes');

            logger.log('info', `Posts with creator user with Id: ${user._id} are found`);

            res.status(200).json({ message: 'Posts succesfully found!', posts });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        }
    }
}

export default PostsController;