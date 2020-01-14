import express from "express";
import isAuth from "../middlewares/isAuth";
import Configuration from '../config/Configuration';
import validationArrays from "../utils/ValidationArrays";
import multer from 'multer';
import User from "../models/User";
import mongoose, { Connection } from "mongoose";
import logger from "../logger/logger";
import { validateUser } from "../utils/validateUser";
import Encryption from "../utils/Encryption";
import pushInUserArray from "../utils/pushInUserarray";
import filterUserArray from "../utils/fitlerUserArray";
import RequestCustom from "../interfaces/RequestCustom.interface";
import Controller from "../interfaces/Controller.interface";

const conn: Connection = mongoose.connection;

const env = process.env.NODE_ENV || 'development';
const config = new Configuration(env);

export default class UsersController implements Controller {
    public path = '/user';
    public router = express.Router();
    private upload = multer({ storage: this.storage });

    constructor(public storage: any) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/info/:userId', isAuth, this.getUserById);
        this.router.get('/search', isAuth, this.searchUser);
        this.router.put('/changePic', isAuth, this.upload.single('avatar'), this.changeProfilePicture);
        this.router.put('/edit', isAuth, this.editUserInfo);

        //route for change pass and pass validation from check from express validator
        this.router.put('/changePassword', validationArrays.newPassword, isAuth, this.changePassword)
        this.router.put('/follow/:followedUserId', isAuth, this.followUser);
        this.router.put('/unfollow/:unfollowedUserId', isAuth, this.unfollowUser);
    }

    private async getUserById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get user id fromr req params
            const userId = req.params.userId;

            const user = await User.findById(userId)
                .populate('followers')
                .populate('subscriptions')
                .populate('posts')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'creator',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'creator'
                        }
                    }
                })
                .populate('notifications')
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'likes'
                    }
                });

            //assign new user info object
            const userInfo = Object.assign({}, {
                username: user.username,
                posts: user.posts,
                comments: user.comments,
                subscriptions: user.subscriptions,
                followers: user.followers,
                imageId: user.imageId,
                id: user._id,
                notifications: user.notifications
            });

            res.status(200).json({ message: 'User is found!', user: userInfo })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        }
    }

    private async changeProfilePicture(req: RequestCustom, res: express.Response, next: express.NextFunction) {
        try {
            //get user id from req user id prop from decoded token
            const userId = req.userId;

            logger.log('debug', 'Change profile picture from request userId: ' + userId);

            //find user by id
            const user = await User.findById(userId);

            //delete the photo before upload with the aim to reduce old files in db
            if (req.file) {
                if (config.environmentConfig.defaultUserImage !== user.imageId.toString()) {
                    const bucket = new mongoose.mongo.GridFSBucket(conn.db);

                    let id = new mongoose.mongo.ObjectID(user.imageId);

                    bucket.delete(id);
                }

                //update user with new image id
                User.findByIdAndUpdate(userId, { imageId: req.file.id }, { new: true, useFindAndModify: false }, (error: any, userDoc: any) => {
                    if (error) {
                        error.statusCode = 500;

                        next(error);
                    }

                    const user = userDoc._doc;

                    delete user.hashedPassword;
                    delete user.salt;

                    logger.log('info', 'Succesfully info updated!');
                    
                    res.status(202).json({ message: 'Succesfully info updated!', user });
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'creator',
                    }
                })
                .populate('notifications')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })    
                .populate('followers')
                    .populate('subscriptions')
                    .populate({
                        path: 'posts',
                        populate: {
                            path: 'comments',
                            populate: {
                                path: 'creator'
                            }
                        }
                    })
                    .populate({
                        path: 'posts',
                        populate: {
                            path: 'likes'
                        }
                    });
            } else {
                const error = new Error('No image files uploaded!');
                error.statusCode = 401;

                throw error;
            }
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        }
    }

    private async editUserInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (validateUser(req, res)) {
            try {
                //get user id fromr req user id prop from decoded token
                const userId = req.userId;

                //init req body
                const reqBody = req.body;

                //update user info with req body object that contains all new user info
                User.findByIdAndUpdate(userId, reqBody, { new: true, useFindAndModify: false }, (error: any, userDoc: any) => {
                    if (error) {
                        error.statusCode = 500;

                        next(error);
                    }

                    const user = userDoc._doc;

                    delete user.hashedPassword;
                    delete user.salt;

                    logger.log('info', 'Succesfully info updated!');

                    res.status(202).json({ message: 'Succesfully info updated!', user });
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                    }
                })
                .populate('notifications')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'creator',
                    }
                })
                    .populate('followers')
                    .populate('subscriptions')
                    .populate({
                        path: 'posts',
                        populate: {
                            path: 'comments',
                            populate: {
                                path: 'creator'
                            }
                        }
                    }).populate({
                        path: 'posts',
                        populate: {
                            path: 'likes'
                        }
                    });
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            }
        }
    }

    private async followUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get followed user id from req params
            const { followedUserId } = req.params;

            logger.log('debug', `Follow user request params: followed user id - ${followedUserId}`);

            //find followed user by id
            const followedUser = await User.findById(followedUserId)
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                    }
                })
                .populate('followers')
                .populate('subscriptions')
                .populate('notifications')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'creator',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'creator'
                        }
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'likes'
                    }
                });

            //find user by req user id from decoded token in middleware
            const user = await User.findById(req.userId)
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                    }
                })
                .populate('followers')
                .populate('notifications')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate('subscriptions')
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'creator',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'creator'
                        }
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'likes'
                    }
                });

            //update followed user's followers array  
            followedUser.followers = pushInUserArray(followedUser.followers, user);
            //update user's subscriptions array  
            user.subscriptions = pushInUserArray(user.subscriptions, followedUser)

            followedUser.save();
            user.save();

            logger.log('info', `User is followed!`);

            res.status(200).json({ message: `User ${followedUser.username} is followed!`, user: followedUser, me: user });
        } catch (error) {
            next(error);
        }
    }

    private async unfollowUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get unfollowed user id
            const { unfollowedUserId } = req.params;
            
            logger.log('debug', `Unfollow user request params: unfollowed user id - ${unfollowedUserId}`);

            //find unfollowed user by id
            const unfollowedUser = await User.findById(unfollowedUserId)
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'creator',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'creator'
                        }
                    }
                })
                .populate('notifications')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate('followers')
                .populate('subscriptions')
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'likes'
                    }
                });

            //find user by user id from decoded token
            const user = await User.findById(req.userId)
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'creator',
                    }
                }).populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'creator'
                        }
                    }
                })
                .populate('notifications')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate('followers')
                .populate('subscriptions')
                .populate('notifications')
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'likes'
                    }
                });

            //filter unfollowed user's followers array 
            unfollowedUser.followers = filterUserArray(unfollowedUser.followers, user._id.toString());
            //filter user's subscriptions array 
            user.subscriptions = filterUserArray(user.subscriptions, unfollowedUser._id.toString());

            unfollowedUser.save();
            user.save();

            logger.log('info', `User is unfollowed!`);

            res.status(200).json({ message: `User ${unfollowedUser.username} is unfollowed!`, user: unfollowedUser, me: user });
        } catch (error) {
            next(error);
        }
    }

    private async searchUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get search text from query
            const { searchText } = req.query;

            logger.log('debug', `Search users request query - search text: ${searchText}`);

            //find all users
            const users = await User.find({});

            //filter users like going to find all users with username that includes that search text
            let filteredUsers = users.filter(u => u.username.toLowerCase().startsWith(searchText.toLowerCase()));
            filteredUsers.forEach(u => {
                u.hashedPassword = undefined;
                u.salt = undefined;
                u.roles = undefined;
            });

            logger.log('info', 'Users are found');

            res.status(200).json({ foundUsers: filteredUsers });
        } catch (error) {
            next(error);
        }
    }

    private async changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            //get old pass and new pass 
            const { oldPassword, newPassword } = req.body;

            logger.log('debug', `Change password request body`);

            //get user id from req user id
            const userId = req.userId;

            //find user by id
            const user = await User.findById(userId);

            //check if old password is not wrong
            if (!user.authenticate(oldPassword)) {
                const error = new Error('Invalid old password');
                error.statusCode = 401;

                throw error;
            }

            //validation for new password
            if (!newPassword.match(/^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/)) {
                const error = new Error('Password must contain at least one letter and at least one digit!');
                error.statusCode = 401;

                throw error;
            } else if (newPassword.lenght < 8) {
                const error = new Error('Password must be at least 8 symbols!');
                error.statusCode = 401;

                throw error;
            }

            const newSalt = Encryption.generateSalt();
            const newHashedPassword = Encryption.generateHashedPassword(newSalt, newPassword);

            //init new updated user obj with new salt and hashed pass
            let updatedUser = Object.assign({}, {
                salt: newSalt,
                hashedPassword: newHashedPassword,
            })

            User.findByIdAndUpdate(userId, updatedUser, { new: true, useFindAndModify: false }, (error, userDoc) => {
                if (error) {
                    error.statusCode = 500;

                    next(error);
                }

                const user = userDoc._doc;

                delete user.hashedPassword;
                delete user.salt;

                logger.log('info', 'Succesfully password changed!');

                res.status(202).json({ message: 'Succesfully password changed!', user });
            }).populate({
                path: 'posts',
                populate: {
                    path: 'comments',
                }
            }).populate({
                path: 'posts',
                populate: {
                    path: 'creator',
                }
            })
            .populate('notifications')
            .populate({
                path: 'posts',
                populate: {
                    path: 'comments',
                    populate: {
                        path: 'creator'
                    }
                }
            })
                .populate('followers')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate('subscriptions')
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'likes'
                    }
                });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        }
    }
}
