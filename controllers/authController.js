const env = process.env.NODE_ENV || 'development';
import config from '../config/config'
const jwtSecret = config[env].JWT_SECRET;

import User from '../models/User';
import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken'

import cleanUserObj from '../utils/cleanUserObj';
import encryption from '../utils/encryption';

import logger from '../logger/logger';

//function for validate data from request
function validateUser(req, res) {
    //get errors (if there are) from validationResult func from express-validator 
    const errors = validationResult(req);

    //if errrors array not empty, then return message to user for incorect data
    if (!errors.isEmpty()) {
        logger.log('error', `Validation Error: Entered data is incorrect!`);

        res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        });

        return false;
    }

    return true;
}

export default {
    signIn: (req, res, next) => {
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
                        jwtSecret);

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
    },
    signUp: (req, res, next) => {

        //check if validate func return true or false for valid data
        if (validateUser(req, res)) {
            //init user info from req body
            const { username, email, firstName, lastName, password } = req.body;

            logger.log('debug', `Register body: username - ${username}, email - ${email}, firstName - ${firstName}, lastName - ${lastName}`);

            //generate salt 
            const salt = encryption.generateSalt();

            //generate hashed pass 
            const hashedPassword = encryption.generateHashedPassword(salt, password);

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
    },

}