import express from 'express';

const router = express.Router();
import usersController from '../controllers/usersController';

import storage from '../config/gridFsStorage';
import multer from 'multer';

import isAuth from '../middlewares/isAuth';

import { check } from 'express-validator/check';

//init 'upload' to get uploaded file from client
const upload = multer({ storage });

router.get('/info/:userId', isAuth, usersController.getUserById);
router.get('/search', isAuth, usersController.searchUser);
router.put('/changePic', isAuth, upload.single('avatar'), usersController.changeProfilePicture);
router.put('/edit', isAuth, usersController.editUserInfo);

//route for change pass and pass validation from check from express validator
router.put('/changePassword', [
    check('newPassword')
        .matches(/^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/)
        .withMessage('Password must contain at least one letter and at least one digit!')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 symbols!')
], isAuth, usersController.changePassword)
router.put('/follow/:followedUserId', isAuth, usersController.followUser);
router.put('/unfollow/:unfollowedUserId', isAuth, usersController.unfollowUser);

export default  router;