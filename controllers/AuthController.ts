import express from 'express';
import validationArrays from '../utils/ValidationArrays';
import logger from '../logger/logger';
import Encryption from '../utils/Encryption';
import User from '../models/User';
import jwt from 'jsonwebtoken'
import cleanUserObj from '../utils/cleanUserObj';
import { validateUser } from '../utils/validateUser';
import Controller from '../interfaces/Controller.interface';

export default class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();

    constructor(private JWT_SECRET: string) {
        this.initialiseRoutes();
    }

    private initialiseRoutes() {
        this.router.post('/signUp', validationArrays.signUp, this.signUp);
        this.router.post('/signIn', validationArrays.signIn, this.signIn);
    }

    signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
        //check if validate func return true or false for valid data
        if (validateUser(req, res)) {
            const { email, password } = req.body;

            logger.log('debug', `Login body: email - ${email}`);

            //find user from req body email
            User.findOne({ email: email })
                .populate('followers')
                .populate('subscriptions')
                .populate({
                    path: 'notifications',
                    populate: {
                        path: 'sender',
                    }
                })
                .populate('notifications')
                .then(user => {
                    //if user is undefined or null then send message 
                    if (!user) {
                        const error = new Error('A user with this email can not be found!');
                        error.statusCode = 401;

                        throw error;
                    }
                    //if check from user method return false , then send message for invalid password
                    if (!user.authenticate(password)) {
                        const error = new Error('Invalid password');
                        error.statusCode = 401;

                        throw error;
                    }

                    //sign new token with email and user id
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                        this.JWT_SECRET);

                    logger.log('info', `User (Id: ${user._id}, email: ${user.email}) is succesfully logged in!`);

                    res.status(200).json({
                        message: 'User is succesfully logged in!',
                        user: cleanUserObj(user._doc),
                        token
                    });
                }).catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }

                    next(error);
                })
        }
    }

    signUp(req: express.Request, res: express.Response, next: express.NextFunction) {

        //check if validate func return true or false for valid data
        if (validateUser(req, res)) {
            //init user info from req body
            const { username, email, firstName, lastName, password } = req.body;

            logger.log('debug', `Register body: username - ${username}, email - ${email}, firstName - ${firstName}, lastName - ${lastName}`);

            //generate salt 
            const salt = Encryption.generateSalt();

            //generate hashed pass 
            const hashedPassword = Encryption.generateHashedPassword(salt, password);

            //create new user
            User.create({
                username,
                email,
                firstName,
                lastName,
                salt,
                hashedPassword,
                roles: ['User']
            })
                .then((user) => {
                    logger.log('info', `User (Id: ${user._id}, email: ${user.email}) is succesfully logged in!`);

                    res.status(201).json({ message: 'User succesfully logged in!' });
                }).catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }

                    next(err);
                })
        }
    }
}