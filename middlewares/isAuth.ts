import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'
const env = process.env.NODE_ENV || 'development';
const jwtSecret = config[env].JWT_SECRET;

//init logger
import logger from '../logger/logger'

export default  (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //get request header for authorization
  const authHeaders = req.get('Authorization');

  //if there is no header return message 
  if (!authHeaders) {
    logger.log('info', `Not authenticated user!`);

    return res.status(401)
      .json({ message: 'Not authenticated.' })
  }

  //if there is header, then we have token from it
  const token = req.get('Authorization').split(' ')[1];

  //init decodedToken
  let decodedToken;

  try {
    //verify token from header so we can see if user is authenticated
    decodedToken = jwt.verify(token, jwtSecret);
  } catch (error) {
    logger.log('error', `Token is invalid!`);

    return res.status(401)
      .json({ message: 'Token is invalid.', error });
  }

  //if verified token is undefined or null then we send message that user is not athenticated
  if (!decodedToken) {
    logger.log('info', `Not authenticated user!`);

    return res.status(401)
      .json({ message: 'Not authenticated.' });
  }

  //set user id to req from decoded token
  req.userId = decodedToken.userId;
  next();
}