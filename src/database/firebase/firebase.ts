import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";
import firebase, { storage } from 'firebase-admin';
const dotenv = require('dotenv')
dotenv.config()

const BUCKET = process.env.BUCKET
let params = JSON.parse(process.env.FIREBASE_CONFIG as string,);

firebase.initializeApp({
    credential: firebase.credential.cert(params),
    storageBucket: BUCKET,
})
const bucket = storage().bucket();

export const uploadImage = async (request: Request, response: Response, next: NextFunction) => {

    if (!request.files && !request.file) {
        response.locals.images = [];
        return next()
    }
    let files = request.files ? request.files as unknown as Express.Multer.File[] : [request.file] as unknown as Express.Multer.File[];

    if (0 === (files.length as unknown as number)) {
        response.locals.images = [];
        return next()
    }

    let images: Object[] = []

    const updateImage = async (image: Express.Multer.File) =>
        new Promise<Object>((resolve, reject) => {


            const buf = randomBytes(16);


            const nomeArquivo = `${buf.toString('hex')}-${image.originalname}`


            const file = bucket.file(`products / ${nomeArquivo}`)

            const stream = file.createWriteStream({
                metadata: {
                    contentType: image.mimetype,
                },
            })

            stream.on("error", (e) => {
                console.error(e);
            })

            stream.on("finish", async () => {
                await file.makePublic();
                const url = file.publicUrl()
                resolve({
                    url,
                    name: image.originalname,
                    key: image.filename,
                })

            })

            stream.end(image.buffer)


        });



    if (files[0].destination) {

        for (let index = 0; index < (files.length as unknown as number); index++) {
            images.push({
                url: process.env.BASE_API_IMAGE + files[index].filename,
                name: files[index].originalname,
                key: files[index].filename,
            });
        };
    } else {

        for (let index = 0; index < (files.length as unknown as number); index++) {

            await updateImage(files[index])
                .then(image => images.push(image))

        };
    }

    response.locals.images = images;
    return next()


}

