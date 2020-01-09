import { validationResult } from "express-validator/check";
import express from 'express';
import logger from "../logger/logger";

//function for validate post data from request
export default function validatePost(req: express.Request, res: express.Response) {
    //get errors (if there are) from validationResult func from express-validator 
    const errors = validationResult(req);

    //if errrors array not empty, then return message to user for incorect data
    if (!errors.isEmpty()) {
        logger.log('error', 'Validation error. Entered data is incorrect')

        res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        });

        return false;
    }

    return true;
}