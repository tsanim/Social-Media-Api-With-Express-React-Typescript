
import GridFsStorage from 'multer-gridfs-storage';
import Configuration from './Configuration';
import crypto from 'crypto';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = new Configuration(env);

export default  new GridFsStorage({
    url: config.environmentConfig.mongoUrl,
    file: (req: Express.Request, file: Express.Multer.File) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err: any, buf: any) => {
                if (err) {
                    return reject(err);
                }

                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
                    || file.mimetype === 'image/jpg') {
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename
                    };

                    resolve(fileInfo);
                } else {
                    return reject(new Error('Must be a valid extension.(".png", ".jpeg", ".jpg")'));
                }
            });
        });
    }
})