import express from 'express';
const router = express.Router();
import authController from '../controllers/authController';
import { check } from 'express-validator/check';

import User from '../models/User';

//init logger
import logger from '../logger/logger';

//route for signup with validation from check frome express-validator
router.post('/signup', [
    check('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 symbols!')
        .custom((value) => {
            return User.findOne({ username: value }).then(userDoc => {
                if (userDoc) {
                    logger.log('warn', 'SignUpError: Username alredy exists!');

                    return Promise.reject('Username already exists!');
                }
            })
        }),
    check('email')
        .isEmail()
        .withMessage('Please enter valid email')
        .custom((value) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    logger.log('warn', 'SignUpError: Email alredy exists!');
                    
                    return Promise.reject('Email adress already exists!');
                }
            })
        }),
    check('firstName')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 symbols'),
    check('lastName')
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 symbols'),
    check('password')
        .matches(/^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/)
        .withMessage('Password must contain at least one letter and at least one digit!')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 symbols!')
], authController.signUp);

//route for signin with validation from check frome express-validator
router.post('/signin', [
    check('email')
    .isEmail()
    .withMessage('Please enter valid email!')
], authController.signIn);



export default  router;
