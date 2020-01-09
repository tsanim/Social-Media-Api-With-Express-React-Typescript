import express from 'express';
const router = express.Router();
import authController from '../controllers/authController';

//init logger
import validationArrays from '../utils/ValidationArrays';


//route for signup with validation from check frome express-validator
router.post('/signup', validationArrays.signUp, authController.signUp);

//route for signin with validation from check frome express-validator
router.post('/signin', validationArrays.signIn, authController.signIn);



export default  router;
