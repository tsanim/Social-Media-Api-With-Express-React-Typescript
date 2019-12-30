const env = process.env.NODE_ENV || 'development';

import GridFsStorage from 'multer-gridfs-storage'
import config from './config'
const { mongoUrl } = config[env];

import crypto from 'crypto';
import path from 'path';

export default  new GridFsStorage({
    url: mongoUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
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