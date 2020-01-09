import { validationResult } from 'express-validator/check';
import logger from '../logger/logger';
import express from 'express';

//function for validate data from request
export function validateUser(req: express.Request, res: express.Response) {
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