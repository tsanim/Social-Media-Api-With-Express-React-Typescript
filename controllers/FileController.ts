import express from "express";
import logger from "../logger/logger";
import mongoose, { Connection } from 'mongoose';
const conn: Connection = mongoose.connection;

class FileController {
    public path = '/feed';
    public router = express.Router();

    constructor() {
        this.intitializeRoutes();
    }

    private intitializeRoutes() {
        this.router.get('/image/:imageId', this.getImage);
    }

    private getImage(req: express.Request, res: express.Response, next: express.NextFunction) {

        //init fs bucket from mongo
        const bucket = new mongoose.mongo.GridFSBucket(conn.db);

        //get image id with req params from db
        let id = new mongoose.mongo.ObjectID(req.params.imageId);

        //init download stream
        let downloadStream = bucket.openDownloadStream(id);

        //when stream trigger 'data' event , write givven chunk to response
        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        //when stream trigger 'error' event , return message that image is not found
        downloadStream.on('error', () => {
            logger.log('error', 'Image error. Image not found')

            res.status(404).json({ message: 'Image not found!' });
        });

        //when stream trigger 'end' event, end res
        downloadStream.on('end', () => {
            res.end();
        });
    }
}

export default FileController;