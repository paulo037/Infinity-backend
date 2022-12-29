import  { Options, diskStorage, memoryStorage,  StorageEngine } from 'multer'
import { resolve } from 'path';
import { randomBytes } from 'crypto';
require('dotenv/config');


const storageTypes = {
    development: diskStorage({
        destination: (request, file, callback) => {
            callback(null, resolve(__dirname, '..', 'tmp', 'uploads'));
        },
        filename: (request, file, callback) => {
            randomBytes(16, (error, hash) => {
                if (error)
                    callback(error, file.filename);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                callback(null, filename);
            });

        },
    }),


    production: memoryStorage(),

}  as {[key:string] : StorageEngine}





export const multerConfig = {

    dest: resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: storageTypes[process.env.NODE_ENV as string],
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type."))
        }
    },
    limits: {
        fieldSize: 20 * 1024 * 1024
    }
} as Options



